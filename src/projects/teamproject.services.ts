import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teamproject } from './entities/teamproject.entity';
import { CreateTeamProjectDto } from './dto/create-teamproject.dto';


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
  
      return projectTeam || null;
    } catch (error) {
      
      console.error("Error ", error);
      return null;
    
    }
  }

  
  async findUserTeamIdAndProjectId(userTeamId: number): Promise<any[]> {
    try {
        const teamprojects = await this.teamprojectRepository.find({
            where: { idUserTeam: userTeamId },
            relations: ['project']
        });

        const result = teamprojects.map(tp => ({
            teamProjectId: tp.id,
            teamProjectDescription: tp.description,
            teamProjectStartDate: tp.startDate,
            teamProjectEndDate: tp.endDate,
            teamProjectProjectId: tp.project.id,
            teamProjectUserId: tp.idUserTeam,
            projectName: tp.project.name
        }));

        return result;
    } catch (error) {
        console.error("Error  ", error);
        return null;
    }
}




async deleteByUserTeamId(userTeamId: number): Promise<void> {
  try {
    const result = await this.teamprojectRepository.delete({ idUserTeam: userTeamId });

    if (result.affected === 0) {
      throw new NotFoundException(`Error, no se encontro el team`);
    }
  } catch (error) {
    console.error('Error al eliminar registros en Teamproject por userTeamId:', error);
    throw error; 
  }
}



}

 
  
  
  

    

 


  

 




