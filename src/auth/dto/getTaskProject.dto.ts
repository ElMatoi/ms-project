import { IsNumber} from "class-validator";


export class getTaskProject{
    @IsNumber()
    idTeamProject: number;
  
}

