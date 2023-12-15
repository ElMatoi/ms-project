
import { Project } from "../entities/project.entity";

export class CreateTeamProjectDto {

    idUserTeam:number
    project: Project;
    description: string;
    startDate: string; 
    endDate: string; 
    status:string; 
    
    
}
