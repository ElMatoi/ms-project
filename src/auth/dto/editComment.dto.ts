import { IsNumber, IsString} from "class-validator";


export class EditCommentTaskDto{
    @IsNumber()
    idTask: number;
    @IsString()
    editComment:string;
  
}

