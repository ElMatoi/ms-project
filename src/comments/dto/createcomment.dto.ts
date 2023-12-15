import { Task } from "src/tasks/entities/task.entity";

export class CreateCommentDto {
  comment:string;
  email:string;
  task:Task;
  }