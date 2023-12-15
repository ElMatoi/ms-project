import { IsNumber} from "class-validator";


export class getCommentTask{
    @IsNumber()
    idTask: number;
  
}

