import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teamproject } from './entities/teamproject.entity';
import { CreateTeamProjectDto } from './dto/create-teamproject.dto';
import { DeleteResult } from 'typeorm';
import { In } from 'typeorm';



@Injectable()
export class ProjectTeamService {
  constructor(
    @InjectRepository(Teamproject)
    private readonly teamprojectRepository: Repository<Teamproject>
  ){}

  createProject(createteamProjectDto: CreateTeamProjectDto) {
    return this.teamprojectRepository.save(createteamProjectDto);
  }

  async findOneByTeamIdAndProjectId(projectId: number): Promise<Teamproject | null> {
    try {
      const projectTeam = await this.teamprojectRepository.findOne({
        where: { project: { id: projectId }},
      });
      console.log(projectTeam)
      return projectTeam || null;
    } catch (error) {
      
      console.error("Error ", error);
      return null;
    
    }
  }
  async findOneByUserIdTeam(idUserTeam: number): Promise<Teamproject | null> {
    try {
      const teamproject = await this.teamprojectRepository.findOne({
        where: { idUserTeam },
        relations: ['project'], 
      });

      return teamproject || null;
    } catch (error) {
      console.error('Error al buscar Teamproject por idUserTeam: ', error);
      return null;
    }
  }
  async findAllByUserTeamIds(idUserTeamIds: number[]): Promise<Teamproject[]> {
    try {
        
        const teamprojects = await this.teamprojectRepository.find({
            where: {
                idUserTeam: In(idUserTeamIds), 
            },
            
        });

        return teamprojects; 
    } catch (error) {
        console.error('Error al buscar Teamprojects por idUserTeamIds: ', error);
        throw error; 
    }}



  
  





async remove(idTeamProject: number): Promise<DeleteResult> {
  try {
    const result = await this.teamprojectRepository.delete(idTeamProject);

    if (result.affected === 0) {
      throw new NotFoundException('No existe proyecto para el equipo');
    }

    return result;
  } catch (error) {
    console.error('Error al eliminar el Teamproject: ', error);
    throw error;
  }
}











}




 
  
  
  

    

 


  

 




