import {Controller, Post,Body, Get, UseGuards, Request} from "@nestjs/common";
import {AuthService} from './project.service';
import { CreateProjectDto } from "./dto/createProject.dto";
import { TeamProjectDto } from "./dto/teamProject.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { getProjectUser } from "./dto/getProjectUser.dto";

@Controller('auth') 
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('createProject')
    createProject(
        @Body()
        createProject: CreateProjectDto,
    ){
        return this.authService.createProject(createProject);
    }

    @Post('addProjectTeam')
    addprojectteam(
        @Body()
        teamprojectDto: TeamProjectDto,

    ){
        return this.authService.addProjectTeam(teamprojectDto);
    }
    @Post('createTask')
    createTask(
        @Body()
        createtask : CreateTaskDto,
    ){
        return this.authService.createTask(createtask)
    }

    @Post('getProjectUserTeam')
    getProjectUser(
        @Body()
        getprojectuserdto: getProjectUser
    ){
        return this.authService.getProjectUser(getprojectuserdto);
    }  

   
    
    
    
}
