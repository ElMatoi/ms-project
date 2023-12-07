import { IsEmail,IsString} from "class-validator";


export class EmailUserDto{

  
  @IsEmail()
  email: string;
  @IsString()
  name: string;
}




  

 
 

  
  
