import { IsEmail, IsString, IsDate, IsOptional, Validate, IsInt, IsIn } from "class-validator";

function isValidDateFormat(value: string): boolean {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(value);
}

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEmail()
  emailCreator: string;

  @IsString()
  nameProject: string;

  @IsString()
  description: string;

  @IsString()
  @Validate(isValidDateFormat, {
    message: 'Invalid date format. Use dd-mm-yyyy.',
  })
  startDate: string;

  @IsString()
  @Validate(isValidDateFormat, {
    message: 'Invalid date format. Use dd-mm-yyyy.',
  })
  endDate: string;

  @IsString()
  state: string;

  @IsString()
  comment: string;

  @IsInt()
  @IsIn([1, 2, 3, 4, 5], { message: 'priority must be 1 and 5' })
  priority: number;
}
