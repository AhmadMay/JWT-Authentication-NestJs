import {IsEmail,IsString,IsNotEmpty,minLength,isString,isNotEmpty} from 'class-validator'
 
export class createUserDto{
   
   @IsEmail()
   name:string;
   
   @IsString()
   @IsNotEmpty()
   email:string;
   
   @IsString() 
   @IsNotEmpty()
   password:string;
   

}

 export default createUserDto