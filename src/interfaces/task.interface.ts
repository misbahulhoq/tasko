export interface ITask {
  title: string;
  description: string;
  user: string;
  status: "pending" | "ongoing" | "done";
  priority: "low" | "medium" | "high";
  startDate: Date;
  endDate: Date;
}
