import {Controller, Post,Body, Get, UseGuards, Request,HttpStatus,HttpException} from "@nestjs/common";
import {AuthService} from './project.service';
import { CreateProjectDto } from "./dto/createProject.dto";
import { TeamProjectDto } from "./dto/teamProject.dto";
import { CreateTaskDto } from "./dto/createTask.dto";
import { getProjectUser } from "./dto/getProjectUser.dto";
import { getTaskProject } from "./dto/getTaskProject.dto";
import { DeleteTeamProject } from "./dto/deleteTeamProject.dto";
import { newCommentDto } from "./dto/newComment.dto";
import { getCommentTask } from "./dto/getCommentTask.dto";
import { EditCommentTaskDto } from "./dto/editComment.dto";


@Controller('auth') 
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('createProject')
    async createProject(
        @Body() createProjectDto: CreateProjectDto
    ) {
        try {
        
            const project = await this.authService.createProject(createProjectDto);
            return project;
        } catch (error) {
            
            console.error('Error al crear el proyecto:', error);

        
            throw new HttpException('Error al crear el proyecto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

@Post('addProjectTeam')
async addProjectTeam(
    @Body() teamProjectDto: TeamProjectDto
) {
    try {
        const projectTeam = await this.authService.addProjectTeam(teamProjectDto);
        return projectTeam;
    } catch (error) {
        console.error('Error al agregar el equipo al proyecto:', error);
        throw new HttpException('Error al agregar el equipo al proyecto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Post('createTask')
async createTask(
    @Body() createTaskDto: CreateTaskDto
) {
    try {
        const task = await this.authService.createTask(createTaskDto);
        return task;
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Post('getProjectUserTeam')
async getProjectUser(
    @Body() getProjectUserDto: getProjectUser
) {
    try {
        const projectUser = await this.authService.getProjectUser(getProjectUserDto);
        return projectUser;
    } catch (error) {
        console.error('Error al obtener el usuario del proyecto:', error);
        throw new HttpException('Error al obtener el usuario del proyecto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@Post('getTaskProject')
async getTaskProject(
    @Body() gettaskproject: getTaskProject
) {
    try {
        const taskproject = await this.authService.getTaskProject(gettaskproject);
        return taskproject
    } catch (error) {
        console.error('Error al obtener tareas del projecto:', error);
        throw new HttpException('Error al obtener tareas del projecto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
@Post('deleteTeamProject')
async deleteTeamProject(
    @Body() deleteteamproject: DeleteTeamProject
) {
    try {
        const taskproject = await this.authService.deleteTeamProject(deleteteamproject);
        return taskproject
    } catch (error) {
        console.error('Error no hay team:', error);
        throw new HttpException('Error ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
@Post('newComment')
async newComent(
    @Body() newcoment: newCommentDto
) {
    try {
        const comment = await this.authService.newComment(newcoment)
        return comment
    } catch (error) {
        console.error('Error no hay team:', error);
        throw new HttpException('Error ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
@Post('getCommentTask')
async getComentTask(
    @Body() getcomenttask: getCommentTask
) {
    try {
        const comment = await this.authService.getCommentTask(getcomenttask);
        return comment
    } catch (error) {
        console.error('Error no hay team:', error);
        throw new HttpException('Error ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
@Post('editComment')
async editComment(
    @Body() editcomenttask: EditCommentTaskDto
) {
    try {
        const comment = await this.authService.editCommentTask(editcomenttask)
        return comment
    } catch (error) {
        console.error('Error no hay team:', error);
        throw new HttpException('Error ', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


   
    
    
}
