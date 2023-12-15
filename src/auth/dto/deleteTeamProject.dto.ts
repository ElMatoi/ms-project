import { IsNumber} from "class-validator";


export class DeleteTeamProject{
    @IsNumber()
    idUserTeam: number;
  
}
