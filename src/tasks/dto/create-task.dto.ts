
import { Teamproject } from "src/projects/entities/teamproject.entity";
import { Project } from 'src/projects/entities/project.entity';

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
  project:Project;
  priority:number
  }