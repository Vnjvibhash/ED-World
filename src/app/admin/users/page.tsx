"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Filter,
  Check
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Student" | "Instructor";
  department: string;
  status: "Active" | "Pending" | "Suspended";
  joinedDate: string;
}

const initialUsers: AdminUser[] = [
  {
    id: "usr-1",
    name: "Vivek Kumar",
    email: "vivek@edworld.edu",
    role: "Administrator",
    department: "Computer Science & Engineering",
    status: "Active",
    joinedDate: "2021-12-31"
  },
  {
    id: "usr-2",
    name: "Sagar Saini",
    email: "sagar@edworld.edu",
    role: "Administrator",
    department: "Computer Science & Engineering",
    status: "Active",
    joinedDate: "2021-12-31"
  },
  {
    id: "usr-3",
    name: "Versha Kumari",
    email: "versha@edworld.edu",
    role: "Instructor",
    department: "Information Technology",
    status: "Active",
    joinedDate: "2022-02-15"
  },
  {
    id: "usr-4",
    name: "Aarav Sharma",
    email: "aarav@student.edworld.edu",
    role: "Student",
    department: "Computer Science & Engineering",
    status: "Active",
    joinedDate: "2026-08-01"
  }
];

export default function AdminUsersPage() {
  const [userList, setUserList] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this user from the directory?")) {
      setUserList((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUserList((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Total Registered: <strong className="text-white">{userList.length}</strong></span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none focus:border-brand-500"
            >
              <option value="All">All Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="Instructor">Instructor</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Administrator"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : user.role === "Instructor"
                          ? "bg-brand-500/10 text-brand-400 border border-brand-500/20"
                          : "bg-slate-800 text-slate-300"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{user.department}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{user.joinedDate}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-brand-400 hover:bg-slate-700 transition-colors"
                        title="Edit User"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="admin-modal bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white">Edit User Profile</h3>
              <form onSubmit={handleSaveEdit} className="space-y-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Full Name</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-accent-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Email Address</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-accent-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Assigned Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as AdminUser["role"] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-accent-500"
                  >
                    <option value="Administrator" className="bg-slate-900 text-white">Administrator</option>
                    <option value="Instructor" className="bg-slate-900 text-white">Instructor</option>
                    <option value="Student" className="bg-slate-900 text-white">Student</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
