/**
 * Cryptographic utilities for client-side password hashing
 * using the standard Web Crypto API (crypto.subtle.digest SHA-256).
 */

export async function hashPassword(
  password: string,
  existingSalt?: string
): Promise<{ hash: string; salt: string }> {
  // Generate a random 16-byte salt if not provided
  let salt = existingSalt;
  if (!salt) {
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);
      salt = Array.from(randomBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    } else {
      salt = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
  }

  // Combine password + salt
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}`);

  // Compute SHA-256 hash
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { hash: hashHex, salt };
}

export async function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string
): Promise<boolean> {
  const { hash } = await hashPassword(password, salt);
  return hash === expectedHash;
}
