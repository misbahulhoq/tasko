export interface ITask {
  _id: string;
  title: string;
  description: string;
  user: string;
  status: "pending" | "ongoing" | "done";
  priority: "low" | "medium" | "high";
  startDate: Date;
  endDate: Date;
}
