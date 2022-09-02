import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { RegisterDto } from "./dto/registerDto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticationService{

    constructor(private readonly userService:UserService){}

    async register( data:RegisterDto){
      const hashedPassword= await bcrypt.hash(data.password,12)

      try {
        const createUser=await this.userService.create({
            ...data,
            password:hashedPassword
        })
        createUser.password=undefined
        return createUser
      } catch (error) {
        if (error?.code===postgressErrorCode.UniqueVoilation){
            throw new HttpException('User with that email adress already exist',HttpStatus.BAD_REQUEST)
        }else{
            throw new HttpException('Something went wrong',HttpStatus.BAD_REQUEST)
        }
      }

    }
    
    async getAuthenticatedUser(email:string,password:string){
        try {
            const user= await this.userService.getByEmail(email)
            await this.verifyPassword(password,user.password)
            user.password=undefined;
            return (user)
            
        } catch (error) {
            throw new HttpException('Wrong credentials provided',HttpStatus.BAD_REQUEST)
        }

    }

    async verifyPassword(password:string,hashedPassword:string){   

        const isPasswordMatching=bcrypt.compare(password,hashedPassword) 

        if(!isPasswordMatching){
          throw new HttpException('Wrong credentials provided',HttpStatus.BAD_REQUEST)
        }  
    }

}