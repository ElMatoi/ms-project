import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

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
  async removeTasksByTeamprojectId(teamprojectId: number): Promise<DeleteResult> {
    try {
      const result = await this.taskRepository.delete({ teamproject: { id: teamprojectId } });

      if (result.affected === 0) {
        throw new NotFoundException('No existen tareas para el Teamproject');
      }

      return result;
    } catch (error) {
      console.error('Error al eliminar tareas: ', error);
      throw error;
    }
  }
  
findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findTasksByName(name: string): Promise<Task[] | null> {
    try {
      const tasks = await this.taskRepository.find({
        where: { name: name },
      });

      return tasks || [];
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  

 
}
