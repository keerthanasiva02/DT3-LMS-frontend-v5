"use client";

import { useState } from "react";
import {
  User,
  BookOpen,
  Bell,
  ChevronRight,
  Mail,
  Shield,
} from "lucide-react";
import { getCurrentUser } from "@/lib/currentUser";
import { instructorCourses } from "@/data/instructorData";

export default function InstructorSettingsPage() {
  const [activeSection, setActiveSection] = useState<"profile" | "courses" | "notifications">("profile");

  const user = getCurrentUser();
  const displayName = user?.name || "Instructor";

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Profile & Settings</h1>
        <p className="text-slate-500 mt-1">Manage your instructor profile and preferences</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "profile" as const, label: "Profile", icon: User },
          { id: "courses" as const, label: "Assigned Courses", icon: BookOpen },
          { id: "notifications" as const, label: "Notifications", icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeSection === tab.id
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Instructor Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-700">
                {displayName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-slate-800">{displayName}</p>
                <p className="text-sm text-slate-500">{user?.email || "instructor@digitalt3.com"}</p>
                <p className="text-xs text-slate-400 mt-1">Instructor</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                defaultValue={displayName}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email || "instructor@digitalt3.com"}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                readOnly
              />
              <p className="text-xs text-slate-500 mt-1">Contact admin to change email</p>
            </div>
            <button className="px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Assigned Courses Section */}
      {activeSection === "courses" && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-800">Assigned Courses</h2>
            <p className="text-sm text-slate-500 mt-1">Courses you are responsible for</p>
          </div>
          <div className="divide-y divide-slate-100">
            {instructorCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-medium text-slate-800">{course.title}</p>
                  <p className="text-sm text-slate-500">{course.role} • {course.phase}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">{course.enrolledCount} enrolled</span>
                  <span className="text-sm font-medium text-teal-600">{course.completionRate}% completion</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === "notifications" && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-slate-800">New Submissions</p>
                  <p className="text-sm text-slate-500">Notify when learners submit assignments or quizzes</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-slate-800">Overdue Reviews</p>
                  <p className="text-sm text-slate-500">Remind when reviews are overdue</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
            </label>
            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="font-medium text-slate-800">Learners at Risk</p>
                  <p className="text-sm text-slate-500">Weekly digest of learners needing attention</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
            </label>
          </div>
          <button className="mt-6 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
