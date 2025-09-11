"use client";
import Image from "next/image";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ITask } from "@/interfaces/task.interface";

const TaskCard: React.FC<{ task: ITask }> = ({ task }) => {
  const {} = task || {};
  return (
    <div className="min-h-[184px] max-w-[485px] rounded-xl border border-gray-200 p-5 shadow-md">
      {/* Top part */}
      <div className="top-part flex items-start gap-5">
        <Image
          src={"/task.svg"}
          alt="task"
          height={43}
          width={43}
          className=""
        />

        <div className="top-part-right grow">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-2xl font-semibold">Art and Craft</h3>
            <TrashIcon className="text-error h-7 w-7" />
          </div>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, fuga.
          </p>
        </div>
      </div>

      {/* Bottom part */}
      <div className="bottom-part mt-8 flex items-center justify-between">
        <span>Date from - to</span>
        <span>Task Status</span>
      </div>
    </div>
  );
};

export default TaskCard;
