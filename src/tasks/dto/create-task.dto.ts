
import { Teamproject } from "src/projects/entities/teamproject.entity";

export class CreateTaskDto {
  name:string;
  iduserCharge:number;
  iduserCreator:number;
  teamproject:Teamproject;
  description: string;
  startDate: string; 
  endDate: string; 
  state: string;
  comment: string;  
  }