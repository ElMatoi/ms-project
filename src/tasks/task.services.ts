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
  
  async findTasksByTeamprojectId(teamprojectId: number): Promise<Task[] | null> {
    try {
      const tasks = await this.taskRepository.find({
        where: { teamproject: { id: teamprojectId } },
      });

      return tasks || [];
    } catch (error) {
      console.error("Error:", error);
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
