import { IsEmail,IsString} from "class-validator";


export class getProjectUser{
    @IsEmail()
    email: string;
  
}

