import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ){}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }
  async findOneByTeamIdAndProjectId(teamProjectId: number): Promise<Task | null> {
    try {
      const projectTeam = await this.taskRepository.findOne({
        where: { teamproject: { id: teamProjectId }},
      });
  
      return projectTeam|| null;
    } catch (error) {
      
      console.error("Error ", error);
      return null;
    
    }
  }  
  
  async findTaskWithTeamProjectAttributes(teamProjectId: number): Promise<any | null> {
    try {
      const task = await this.taskRepository.findOne({
        where: { teamproject: { id: teamProjectId }},
        relations: ['teamproject'], 
      });
  
      if (!task || !task.teamproject) {
        return null;
      }
  
      const result = {
        teamProjectId: task.teamproject.id,
        teamProjectDescription: task.teamproject.description,
        teamProjectStartDate: task.teamproject.startDate,
        teamProjectEndDate: task.teamproject.endDate,
        teamProjectProjectId: task.teamproject.project?.id, 
        teamProjectUserId: task.teamproject.idUserTeam,
        projectName: task.teamproject.project?.name, 
        taskId: task.id,
        taskName: task.name,
        taskDescription: task.description,
        taskStartDate: task.startDate,
        taskEndDate: task.endDate,
        taskState: task.state,
        taskComment: task.comment,
        taskUserIdCharge: task.iduserCharge,
        taskUserIdCreator: task.iduserCreator,
      };
  
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  




  

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  

 
}
