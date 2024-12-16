// filter-task.dto.ts
export class FilterTaskDto {
  status?: string;
  page?: number;
  limit?: number;
  priority?:string;
  dueDate?:string
}
