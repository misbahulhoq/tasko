import { useCreateTaskMutation } from "@/redux/features/tasks/tasksApiSlice";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

type TaskFormData = {
  title: string;
  description: string;
  status: "pending" | "ongoing" | "done";
  startDate: Date;
  endDate: Date;
};

const AddTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TaskFormData>();
  const [addNewTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    console.log(data);
    addNewTask(data)
      .unwrap()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  return (
    <>
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={() =>
          document.getElementById("add_task_modal")?.classList.add("modal-open")
        }
      >
        + Add New Task
      </button>

      <dialog id="add_task_modal" className="modal">
        <div className="modal-box">
          <h3 className="mb-3 text-center text-xl font-semibold">
            Add new task
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="task-form space-y-3"
          >
            <div className="form-group">
              <label htmlFor="title" className="mb-0.5 block">
                Title
              </label>
              <input
                id="title"
                className="input input-primary"
                type="text"
                placeholder="Enter Title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-error text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="block">
                Description:
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required.",
                })}
                className="textarea textarea-primary"
              />
              {errors.description && (
                <p className="text-error text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status" className="block">
                Status
              </label>
              <select
                id="status"
                className="select select-primary"
                {...register("status")}
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="startDate" className="block">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="input input-primary"
                {...register("startDate", {
                  required: "Start Date is required",
                  valueAsDate: true,
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      value.getTime() >= today.getTime() ||
                      "Start date cannot be in the past."
                    );
                  },
                })}
              />
              {errors.startDate && (
                <p className="text-error text-sm">{errors.startDate.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endDate" className="block">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                className="input input-primary"
                placeholder="Enter end data here"
                {...register("endDate", {
                  valueAsDate: true,
                  required: "End Date is required",
                  validate: (value) => {
                    const startDate = getValues("startDate");
                    if (!startDate) return "Please select a start date first.";
                    return (
                      value.getTime() >= startDate.getTime() ||
                      "End date cannot be before the start date."
                    );
                  },
                })}
              />
              {errors.endDate && (
                <p className="text-error text-sm">{errors.endDate.message}</p>
              )}
            </div>

            {/* save and close buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  document
                    .getElementById("add_task_modal")
                    ?.classList.remove("modal-open")
                }
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddTaskForm;
