export type ScheduleItemStatus = "success" | "default" | "disabled";

export interface ScheduleItemProps {
  title: string;
  time: string;
  status?: ScheduleItemStatus;
}