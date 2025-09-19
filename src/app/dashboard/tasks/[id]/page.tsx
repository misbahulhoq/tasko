"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";
import { useGetTaskByIdQuery } from "@/redux/features/tasks/tasksApiSlice";

const TaskDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<null | string>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: task } = useGetTaskByIdQuery(
    { id: id as string },
    { skip: !id },
  );

  useEffect(() => {
    function setTaskId() {
      params.then((res) => {
        setId(res.id);
      });
    }

    setTaskId();

    return () => setTaskId();
  });

  if (!task) return null;

  const {
    title,
    description,
    status,
    priority,
    startDate,
    endDate,
    daysRemaining,
    daySummary,
  } = task?.data || {};

  console.log(typeof startDate);

  const getStatusConfig = (status: "pending" | "ongoing" | "done") => {
    const configs = {
      pending: {
        color: "bg-gradient-to-r from-gray-400 to-gray-500",
        textColor: "text-gray-700",
        icon: Pause,
        label: "Pending",
        borderColor: "border-gray-300",
        glowColor: "shadow-gray-200/50",
      },
      ongoing: {
        color: "bg-gradient-to-r from-blue-500 to-purple-600",
        textColor: "text-blue-700",
        icon: Play,
        label: "In Progress",
        borderColor: "border-blue-300",
        glowColor: "shadow-blue-200/50",
      },
      done: {
        color: "bg-gradient-to-r from-green-500 to-emerald-600",
        textColor: "text-green-700",
        icon: CheckCircle2,
        label: "Completed",
        borderColor: "border-green-300",
        glowColor: "shadow-green-200/50",
      },
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: "low" | "medium" | "high") => {
    const configs = {
      low: {
        color: "bg-gradient-to-r from-green-100 to-green-200",
        textColor: "text-green-800",
        borderColor: "border-green-300",
        label: "Low Priority",
      },
      medium: {
        color: "bg-gradient-to-r from-yellow-100 to-orange-200",
        textColor: "text-orange-800",
        borderColor: "border-orange-300",
        label: "Medium Priority",
      },
      high: {
        color: "bg-gradient-to-r from-red-100 to-pink-200",
        textColor: "text-red-800",
        borderColor: "border-red-300",
        label: "High Priority",
      },
    };
    return configs[priority];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusConfig = getStatusConfig(status);
  const priorityConfig = getPriorityConfig(priority);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`relative mx-auto max-w-2xl rounded-3xl bg-white shadow-2xl ${statusConfig.glowColor} border ${statusConfig.borderColor} transform overflow-hidden transition-all duration-500`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 opacity-60"></div>

      {/* Floating orbs animation */}
      <div className="absolute top-4 right-4 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-10"></div>
      <div className="absolute bottom-4 left-4 h-16 w-16 animate-bounce rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-10"></div>

      <div className="relative p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl leading-tight font-bold text-gray-900">
              {title}
            </h1>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 rounded-full px-2 py-2 text-xs sm:px-4 sm:text-sm ${statusConfig.color} font-semibold text-white shadow-lg`}
              >
                <StatusIcon size={18} />
                {statusConfig.label}
              </div>
              <div
                className={`rounded-full px-1.5 py-2 text-xs sm:px-4 sm:text-sm ${priorityConfig.color} ${priorityConfig.textColor} border font-semibold ${priorityConfig.borderColor} bg-red-300`}
              >
                <AlertCircle size={16} className="mr-2 inline" />
                {priorityConfig.label}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
            Description
          </h3>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p
              className={`leading-relaxed text-gray-700 ${!showFullDescription && description.length > 150 ? "line-clamp-3" : ""}`}
            >
              {description}
            </p>
            {description.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Timeline</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-indigo-600">
                    Start Date
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(startDate)}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    End Date
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatDate(endDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Days Remaining */}
        <div className="mb-8">
          <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-600" size={24} />
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    Days Remaining
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {daysRemaining < 0 ? "Over" : daysRemaining}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Time Status</p>
                <p
                  className={`font-semibold ${daysRemaining <= 2 ? "text-red-600" : daysRemaining <= 5 ? "text-orange-600" : "text-green-600"}`}
                >
                  {daysRemaining < 0
                    ? "Over"
                    : daysRemaining <= 2
                      ? "Urgent"
                      : daysRemaining <= 5
                        ? "Due Soon"
                        : "On Track"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Summary */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            Day Summary
          </h3>
          <div className="rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-4">
            <p className="leading-relaxed text-gray-700 italic">{daySummary}</p>
          </div>
        </div>

        {/* Interactive hover effect overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transition-opacity duration-300`}
        ></div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
