"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ITask } from "@/interfaces/task.interface";
import { Trash2, Calendar, Clock, CheckCircle2, Play } from "lucide-react";
import { TaskStatus } from "@/types/task-status.type";
import { useUpdateTaskStatusMutation } from "@/redux/features/tasks/tasksApiSlice";
import { stat } from "fs";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const { title, description, status: taskStatus } = task || {};
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<TaskStatus>(taskStatus);
  const [updateTaskStatus, { isLoading: isTaskUpdating }] =
    useUpdateTaskStatusMutation();

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case "done":
        return {
          icon: CheckCircle2,
          text: "Completed",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          borderColor: "border-emerald-200",
        };
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          bgColor: "bg-amber-50",
          textColor: "text-amber-700",
          borderColor: "border-amber-200",
        };
      default:
        return {
          icon: Play,
          text: "Ongoing",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-200",
        };
    }
  };

  const statusConfig = getStatusConfig(task.status);
  const StatusIcon = statusConfig.icon;

  const handleStatusUpdate = (task: ITask) => {
    if (task.status === "done") return;
    const statuses = ["pending", "ongoing", "done"];
    const currentIndex = statuses.indexOf(status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateTaskStatus({ ...task, status: nextStatus as TaskStatus });
    // setStatus(nextStatus as TaskStatus);
  };

  return (
    <div className="mx-auto max-w-[520px]">
      <div
        className={`relative min-h-[200px] rounded-2xl border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 ease-out hover:shadow-xl ${isHovered ? "scale-[1.02] border-gray-300" : ""} overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient background accent */}
        <div className="bg-primary to-accent absolute top-0 right-0 left-0 h-1" />
        {/* Top section */}
        <div className="mb-6 flex items-start gap-4">
          {/* Icon container with hover effect */}
          <Image
            src={"/task.svg"}
            alt="task"
            height={43}
            width={43}
            className={`transition-transform duration-200 ${isHovered ? "scale-110 rotate-3" : ""} `}
          />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="cursor-pointer text-xl leading-tight font-bold text-gray-900">
                {title}
              </h3>
              <button
                className={`group rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-red-50 ${isHovered ? "opacity-100" : "opacity-70"} `}
                aria-label="Delete task"
              >
                <Trash2 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-red-500" />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4">
          {/* Date section */}
          <div className="flex items-center gap-2 text-sm">
            <div className="rounded-lg bg-gray-100 p-1.5">
              <Calendar className="h-3.5 w-3.5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Dec 15 - 22</p>
              <p className="text-xs text-gray-500">7 days remaining</p>
            </div>
          </div>

          {/* Status badge */}
          <div
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} `}
            onClick={() => handleStatusUpdate(task)}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusConfig.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
