import { NextRequest, NextResponse } from "next/server";
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

interface CompileRequestBody {
  language: "c" | "cpp" | "python" | "java" | "javascript";
  code: string;
  stdin?: string;
  testCases?: TestCase[];
}

// Language ID Mapping for Serverless Cloud Execution
const CLOUD_LANG_IDS: Record<string, number> = {
  c: 50, // C (GCC 9.2.0)
  cpp: 54, // C++ (GCC 9.2.0)
  python: 71, // Python (3.8.1)
  java: 62, // Java (OpenJDK 13.0.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
};

// Check if a local compiler command exists in PATH
function hasLocalCommand(cmd: string): boolean {
  try {
    const res = spawnSync("which", [cmd], { encoding: "utf-8", timeout: 1000 });
    return res.status === 0 && !!res.stdout.trim();
  } catch {
    return false;
  }
}

// Execute remotely via Cloud Runner (Used when running in serverless environments where local compilers are not present)
async function executeViaCloud(
  language: string,
  code: string,
  stdin: string
): Promise<{ stdout: string; stderr: string; exitCode: number; executionTimeMs: number }> {
  const langId = CLOUD_LANG_IDS[language] || 54;
  const startTime = Date.now();

  try {
    const res = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: code,
        language_id: langId,
        stdin: stdin || "",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        stdout: "",
        stderr: `Cloud Compiler Error (${res.status}): ${errText}`,
        exitCode: 1,
        executionTimeMs: Date.now() - startTime,
      };
    }

    const data = await res.json();
    const stdout = data.stdout || "";
    const stderr = data.stderr || data.compile_output || (data.status?.id > 3 ? data.status.description : "") || "";
    const exitCode = data.status?.id === 3 ? 0 : data.status?.id || 1;
    const timeMs = data.time ? Math.round(parseFloat(data.time) * 1000) : Date.now() - startTime;

    return {
      stdout,
      stderr,
      exitCode,
      executionTimeMs: timeMs,
    };
  } catch (err: unknown) {
    const e = err as Error;
    return {
      stdout: "",
      stderr: `Judge0 Connection Error: ${e.message}`,
      exitCode: 1,
      executionTimeMs: Date.now() - startTime,
    };
  }
}

// Ensure execution path includes Homebrew and standard binaries
const ENV_PATH = [
  "/opt/homebrew/bin",
  "/opt/homebrew/opt/openjdk@17/bin",
  "/opt/homebrew/opt/node@24/bin",
  "/usr/local/bin",
  "/usr/bin",
  "/bin",
  "/usr/sbin",
  "/sbin",
  process.env.PATH || "",
].join(":");

const EXEC_TIMEOUT_MS = 5000;
const MAX_OUTPUT_BYTES = 50 * 1024; // 50KB

function runCompiledBinary(
  executable: string,
  args: string[],
  inputStr: string,
  cwd?: string
): { stdout: string; stderr: string; exitCode: number; executionTimeMs: number } {
  const startTime = Date.now();
  const res = spawnSync(executable, args, {
    input: inputStr,
    encoding: "utf-8",
    timeout: EXEC_TIMEOUT_MS,
    maxBuffer: MAX_OUTPUT_BYTES,
    cwd,
    env: { ...process.env, PATH: ENV_PATH, PYTHONUNBUFFERED: "1" },
  });

  const execTime = Date.now() - startTime;
  if (res.error && (res.error as { code?: string }).code === "ETIMEDOUT") {
    return {
      stdout: res.stdout || "",
      stderr: "Time Limit Exceeded: Process exceeded 5.0 seconds.",
      exitCode: 124,
      executionTimeMs: execTime,
    };
  }

  return {
    stdout: (res.stdout || "").slice(0, MAX_OUTPUT_BYTES),
    stderr: (res.stderr || "").slice(0, MAX_OUTPUT_BYTES),
    exitCode: res.status ?? (res.error ? 1 : 0),
    executionTimeMs: execTime,
  };
}

function normalizeOutput(out: string): string {
  return out
    .trim()
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body: CompileRequestBody = await req.json();
    const { language, code, stdin = "", testCases } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Source code is required." }, { status: 400 });
    }

    // Determine if local compiler is available on the current host (Local machine vs Serverless runtime)
    const isLocalAvailable =
      (language === "c" && hasLocalCommand("gcc")) ||
      (language === "cpp" && hasLocalCommand("g++")) ||
      (language === "python" && hasLocalCommand("python3")) ||
      (language === "java" && hasLocalCommand("javac")) ||
      (language === "javascript" && hasLocalCommand("node"));

    // If local compiler is NOT available, use Cloud execution
    if (!isLocalAvailable) {
      if (!testCases || testCases.length === 0) {
        const cloudRes = await executeViaCloud(language, code, stdin);
        return NextResponse.json({
          success: cloudRes.exitCode === 0,
          stdout: cloudRes.stdout,
          stderr: cloudRes.stderr,
          exitCode: cloudRes.exitCode,
          executionTimeMs: cloudRes.executionTimeMs,
          engine: "Cloud Execution Sandbox",
        });
      }

      // Batch Test Cases via Cloud
      const testResults = [];
      let passedCount = 0;
      let totalTime = 0;

      for (const tc of testCases) {
        const tcRes = await executeViaCloud(language, code, tc.input);
        totalTime += tcRes.executionTimeMs;

        const normActual = normalizeOutput(tcRes.stdout);
        const normExpected = normalizeOutput(tc.expectedOutput);
        const passed = tcRes.exitCode === 0 && normActual === normExpected;

        if (passed) passedCount++;

        testResults.push({
          id: tc.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: tcRes.stdout,
          stderr: tcRes.stderr,
          exitCode: tcRes.exitCode,
          passed,
          executionTimeMs: tcRes.executionTimeMs,
        });
      }

      return NextResponse.json({
        success: true,
        allPassed: passedCount === testCases.length,
        passedCount,
        totalCount: testCases.length,
        totalExecutionTimeMs: totalTime,
        testResults,
        engine: "Cloud Execution Sandbox",
      });
    }

    // --- LOCAL COMPILER EXECUTION (For local dev or machines with toolchains installed) ---
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ed_ide_"));

    try {
      let executable = "";
      let baseArgs: string[] = [];
      let workingDir = tmpDir;

      if (language === "c") {
        const srcPath = path.join(tmpDir, "solution.c");
        const binPath = path.join(tmpDir, "solution_c");
        fs.writeFileSync(srcPath, code, "utf-8");

        const comp = spawnSync("gcc", ["-O2", "-Wall", srcPath, "-o", binPath], {
          encoding: "utf-8",
          timeout: 6000,
          env: { ...process.env, PATH: ENV_PATH },
        });

        if (comp.status !== 0) {
          return NextResponse.json({
            success: false,
            compilationError: true,
            stdout: "",
            stderr: comp.stderr || "C Compilation Error",
            exitCode: comp.status ?? 1,
            executionTimeMs: 0,
            engine: "Local GCC",
          });
        }
        executable = binPath;
      } else if (language === "cpp") {
        const srcPath = path.join(tmpDir, "solution.cpp");
        const binPath = path.join(tmpDir, "solution_cpp");
        fs.writeFileSync(srcPath, code, "utf-8");

        const comp = spawnSync("g++", ["-std=c++17", "-O2", "-Wall", srcPath, "-o", binPath], {
          encoding: "utf-8",
          timeout: 6000,
          env: { ...process.env, PATH: ENV_PATH },
        });

        if (comp.status !== 0) {
          return NextResponse.json({
            success: false,
            compilationError: true,
            stdout: "",
            stderr: comp.stderr || "C++ Compilation Error",
            exitCode: comp.status ?? 1,
            executionTimeMs: 0,
            engine: "Local G++",
          });
        }
        executable = binPath;
      } else if (language === "java") {
        const classMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
        const className = classMatch ? classMatch[1] : "Main";
        const srcPath = path.join(tmpDir, `${className}.java`);
        fs.writeFileSync(srcPath, code, "utf-8");

        const comp = spawnSync("javac", [srcPath], {
          encoding: "utf-8",
          timeout: 7000,
          cwd: tmpDir,
          env: { ...process.env, PATH: ENV_PATH },
        });

        if (comp.status !== 0) {
          return NextResponse.json({
            success: false,
            compilationError: true,
            stdout: "",
            stderr: comp.stderr || "Java Compilation Error",
            exitCode: comp.status ?? 1,
            executionTimeMs: 0,
            engine: "Local OpenJDK",
          });
        }
        executable = "java";
        baseArgs = [className];
      } else if (language === "python") {
        const scriptPath = path.join(tmpDir, "solution.py");
        fs.writeFileSync(scriptPath, code, "utf-8");
        executable = "python3";
        baseArgs = [scriptPath];
      } else {
        // JavaScript
        const scriptPath = path.join(tmpDir, "solution.js");
        fs.writeFileSync(scriptPath, code, "utf-8");
        executable = "node";
        baseArgs = [scriptPath];
      }

      // Single Custom Run
      if (!testCases || testCases.length === 0) {
        const run = runCompiledBinary(executable, baseArgs, stdin, workingDir);
        return NextResponse.json({
          success: run.exitCode === 0,
          stdout: run.stdout,
          stderr: run.stderr,
          exitCode: run.exitCode,
          executionTimeMs: run.executionTimeMs,
          engine: "Local Compiler",
        });
      }

      // Batch Test Cases
      const testResults = [];
      let passedCount = 0;
      let totalTime = 0;

      for (const tc of testCases) {
        const tcRes = runCompiledBinary(executable, baseArgs, tc.input, workingDir);
        totalTime += tcRes.executionTimeMs;

        const normActual = normalizeOutput(tcRes.stdout);
        const normExpected = normalizeOutput(tc.expectedOutput);
        const passed = tcRes.exitCode === 0 && normActual === normExpected;

        if (passed) passedCount++;

        testResults.push({
          id: tc.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: tcRes.stdout,
          stderr: tcRes.stderr,
          exitCode: tcRes.exitCode,
          passed,
          executionTimeMs: tcRes.executionTimeMs,
        });
      }

      return NextResponse.json({
        success: true,
        allPassed: passedCount === testCases.length,
        passedCount,
        totalCount: testCases.length,
        totalExecutionTimeMs: totalTime,
        testResults,
        engine: "Local Compiler",
      });
    } finally {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {}
    }
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: `Internal execution error: ${error.message}` },
      { status: 500 }
    );
  }
}
