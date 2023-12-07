import { Module } from "@nestjs/common";

import { AuthController } from "./project.controller";
import { AuthService } from "./project.service";
import { jwtConstants } from "./jwt.constant";
import { JwtModule } from "@nestjs/jwt";

import { ProjectsModule } from "src/projects/projects.module";
import { TeamProjectModule } from "src/projects/teamproject.module";
import { TaskModule } from "src/tasks/task.module";

@Module({
  imports: [
    
    ProjectsModule,
    TeamProjectModule,
    TaskModule,
    
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

