import { Interface } from "readline";

export interface Task{
  id: string;
  title: string;
  date: Date;
  description?: string;
}
export interface TaskData{
  id: string;
  title: string;
  date: string;
  description?: string;
}
