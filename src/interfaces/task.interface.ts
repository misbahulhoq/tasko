export interface ITask {
  title: string;
  description: string;
  status: "pending" | "ongoing" | "done";
  startDate: Date;
  endDate: Date;
}
