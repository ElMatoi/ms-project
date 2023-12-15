import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teamproject } from './entities/teamproject.entity';
import { CreateTeamProjectDto } from './dto/create-teamproject.dto';
import { DeleteResult } from 'typeorm';


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
  async findOneByUserIdTeam(idUserTeam: number): Promise<Teamproject | null> {
    try {
      const teamproject = await this.teamprojectRepository.findOne({
        where: { idUserTeam },
        relations: ['project'], // Si necesitas traer la relación con el proyecto
      });

      return teamproject || null;
    } catch (error) {
      console.error('Error al buscar Teamproject por idUserTeam: ', error);
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




 
  
  
  

    

 


  

 




