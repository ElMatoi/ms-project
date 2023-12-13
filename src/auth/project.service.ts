import {BadRequestException, Injectable,UnauthorizedException } from "@nestjs/common";
import { NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from "./dto/createProject.dto";
import { TeamProjectDto } from "./dto/teamProject.dto";
import { ProjectService } from "src/projects/projects.service";
import { ProjectTeamService } from "src/projects/teamproject.services";
import { TaskService } from "src/tasks/task.services";
import { CreateTaskDto } from "./dto/createTask.dto";
import { getProjectUser } from "./dto/getProjectUser.dto";
import axios from 'axios';



@Injectable()
export class AuthService{
    constructor(
     private readonly projectsService: ProjectService,
      private readonly tprojService: ProjectTeamService,
      private readonly taskService: TaskService,
      ){} 
      /////////////////////////////////////////////////////////////////////////////////////
      async createProject({name}: CreateProjectDto) {
        try {
          
          const createProject = await this.projectsService.createProject({
            name
          });
          return true;
        } catch (error) {
          
          console.error('Ocurrió un error al crear el proyecto:', error);
          
          return false;
        }
      }
      
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async addProjectTeam({ nameProject,email,name, description, startDate, endDate }: TeamProjectDto) {
        try {
          const [userResponse, teamResponse] = await Promise.all([
            axios.post('http://localhost:3000/api/v1/auth/catchUser', { email: email }),
            axios.post('http://localhost:3000/api/v1/auth/catchTeam', { name: name })
          ]);
           
          if (userResponse && userResponse.data) {
            console.log("User Data:", userResponse.data);
          } else {
            console.log("User response is undefined or does not have data");
          }
      
          if (teamResponse && teamResponse.data) {
              console.log("Team Data:", teamResponse.data);
          } else {
              console.log("Team response is undefined or does not have data");
          }
          const idUser = userResponse.data; 
          const idTeam = teamResponse.data; 
          const responseThree = await axios.post('http://localhost:3000/api/v1/auth/CatchUserTeamIDto', {
            idUser,
            idTeam
          });
          const idUserTeam= responseThree.data;
          console.log(idUserTeam)
          const project = await this.projectsService.findOneByName(nameProject);
          console.log(project);

          const createTeamProject = await this.tprojService.createProject({
          idUserTeam,
          project,
          description,
          startDate,
          endDate 
        });
        return true;

        } catch (error) {
          console.error(error);
          
          throw new Error('Error, ups algo fallo...');
          return false;
        }
      
     }
     /////////////////////////////////////////////////////////////////////////////
      async createTask ({name,email,emailCreator,nameProject,description,startDate,endDate,state,comment}:CreateTaskDto){
        try {
          const [userResponse, userCreatorResponse] = await Promise.all([
            axios.post('http://localhost:3000/api/v1/auth/catchUser', { email: email }),
            axios.post('http://localhost:3000/api/v1/auth/catchUserTaskCreator', {emailCreator:emailCreator })
          ]);

        const iduserCharge = userResponse.data; 
        const iduserCreator =userCreatorResponse.data;   
        const project= await this.projectsService.findOneByName(nameProject);
        const teamproject= await this.tprojService.findOneByTeamIdAndProjectId(project.id);
        const createTask= await this.taskService.create({
          name,
          iduserCreator,
          iduserCharge,
          teamproject,
          description,
          startDate,
          endDate,
          state,
          comment
        })
          return true;
        } catch (error) {
          console.error(error);
          throw new Error('Error, Usuario sin equipo');
          return false;
        }
      }
      ////////////////////////////////////////////////////////////
      async getProjectUser({email}: getProjectUser) {
        try {
            const userResponse = await axios.post('http://localhost:3000/api/v1/auth/catchUser', {
                email: email
            });
            const idUser = userResponse.data;
           // console.log(idUser);
    
            try {
                const response = await axios.post('http://localhost:3000/api/v1/auth/getProjectUser', {
                    idUser: idUser 
                });
    
                
                
                const teamproject = response.data;
                const projects = await this.tprojService.findUserTeamIdAndProjectId(teamproject);
                //console.log(projects);
                return projects;
               
            } catch (innerError) {
                console.error('Hubo un error con la petición interna:', innerError);
            }
    
        } catch (error) {
          
            throw new Error('Error, ups algo fallo...user sin equipo');
            return false;
        }
    }
    

}
    
  
  
  
  