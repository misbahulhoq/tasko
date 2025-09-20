"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ITask } from "@/interfaces/task.interface";
import { Trash2, Calendar, Clock, CheckCircle2, Play } from "lucide-react";
import { TaskStatus } from "@/types/task-status.type";
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "@/redux/features/tasks/tasksApiSlice";
import Link from "next/link";
import Swal from "sweetalert2";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const { _id, title, description, daysRemaining, daySummary, status } =
    task || {};
  const [isHovered, setIsHovered] = useState(false);
  const [updateTaskStatus, { isLoading: isTaskUpdating }] =
    useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    const showUrgentTaskNotification = () => {
      if (daysRemaining < 3) {
        // const notification = new Notification("Less than 3 days remaining", {
        //   silent: false,
        // });
      }
    };
    function test() {
      if (navigator.serviceWorker) {
        navigator.serviceWorker
          .register("./sw.js")
          .then(() => {
            console.log("Service Worker Registered");
          })
          .catch((err) => console.log("Error", err));
      } else {
        console.log("Navigator not supported.");
      }
    }
    test();

    // showUrgentTaskNotification();
    return () => showUrgentTaskNotification();
  });

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

  const getPriorityConfig = (priority: "low" | "medium" | "high") => {
    switch (priority?.toLowerCase()) {
      case "high":
      case "urgent":
        return {
          text: "High",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          dotColor: "bg-red-500",
        };
      case "medium":
      case "normal":
        return {
          text: "Medium",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200",
          dotColor: "bg-yellow-500",
        };
      case "low":
        return {
          text: "Low",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          dotColor: "bg-green-500",
        };
      default:
        return {
          text: "Normal",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200",
          dotColor: "bg-gray-500",
        };
    }
  };

  const statusConfig = getStatusConfig(task.status);
  const StatusIcon = statusConfig.icon;
  const priorityConfig = getPriorityConfig(task.priority);

  const handleStatusUpdate = (task: ITask) => {
    if (task.status === "done") return;
    const statuses = ["pending", "ongoing", "done"];
    const currentIndex = statuses.indexOf(task.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateTaskStatus({ ...task, status: nextStatus as TaskStatus });
  };

  const handleDelete = (taskId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask({ id: taskId })
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          });
      }
    });
  };

  return (
    <div className="max-w-[520px]">
      <div
        className={`relative min-h-[200px] rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-3 shadow-lg transition-all duration-300 ease-out hover:shadow-xl ${isHovered ? "scale-[1.02] border-gray-300" : ""} overflow-hidden`}
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
            <div className="mb-2 flex items-start justify-between gap-3">
              <Link
                href={`/dashboard/tasks/${task._id}`}
                className="line-clamp-2 cursor-pointer pr-20 text-xl leading-tight font-bold text-gray-900" // Added right padding to avoid overlap with priority badge
              >
                {title}
              </Link>
              <button
                className={`group rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-red-50 ${isHovered ? "opacity-100" : "opacity-70"} `}
                aria-label="Delete task"
                onClick={() => handleDelete(_id)}
              >
                <Trash2 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-red-500" />
              </button>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        </div>

        {/* Priority indicator - top right corner */}
        <div className="absolute top-2 -left-2 -rotate-32">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityConfig.bgColor} ${priorityConfig.textColor} ${priorityConfig.borderColor}`}
          >
            <div
              className={`h-2 w-2 rounded-full ${priorityConfig.dotColor}`}
            />
            {priorityConfig.text}
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
              <p className="text-xs font-medium text-gray-900 sm:text-sm">
                {daySummary}
              </p>
              <p
                className={`text-[10px] text-gray-500 sm:text-xs ${daysRemaining > 0 ? "font-semibold" : ""} ${status === "done" && "hidden"}`}
              >
                {daysRemaining > 0 ? `${daysRemaining} days left` : "Time over"}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} `}
            onClick={() => handleStatusUpdate(task)}
          >
            {isTaskUpdating ? (
              "updating..."
            ) : (
              <>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusConfig.text}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
