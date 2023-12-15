import { IsString} from "class-validator";


export class DeleteTaskProject{
   
    @IsString()
    name:string;
  
}
