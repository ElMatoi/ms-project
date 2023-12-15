import { IsString,IsEmail} from "class-validator";


export class newCommentDto{
    @IsEmail()
  email: string;;
    @IsString()
    comment:string;
    @IsString()
    nameTask:string;


  
}
