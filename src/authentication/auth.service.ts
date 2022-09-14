import {  HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt'
import createUserDto from "../users/dto/createUserDto";
import { JwtService } from "@nestjs/jwt";
import {ConfigService } from "@nestjs/config";


@Injectable()
export class AuthenticationService{

    constructor(
      private readonly userService:UserService,
      private readonly jwtservice:JwtService,){}
      private readonly configService:ConfigService
    async register( data:createUserDto){
      const hashedPassword= await bcrypt.hash(data.password,10)
      try {
        const createUser= await this.userService.createUser({
          ...data,
          password:hashedPassword})
        return createUser
      } catch (error) {
        if (error?.code==="23505"){
            throw new HttpException('User with that email adress already exist',HttpStatus.BAD_REQUEST)
        }else{
            throw new HttpException('Something went wrong',HttpStatus.BAD_REQUEST)
        }
      }

    }

    public async getAuthenticatedUser(email:string,password:string){
      try {
          const user= await this.userService.getByEmail(email)
            this.verifyPassword(password,user.password)
            user.password=undefined;
            console.log(user);
            return user
        } catch (error) {
            throw new HttpException('Wrong credentials provided',HttpStatus.BAD_REQUEST)
        }

    }

    private async verifyPassword(password:string,hashedPassword:string){   
      try {
        const isPasswordMatching=await bcrypt.compare(password,hashedPassword) 
          if(!isPasswordMatching){
            throw new HttpException('Wrong credentials provided',HttpStatus.BAD_REQUEST)
          }  
      } catch (error) {
        throw new HttpException('something want wrong',HttpStatus.BAD_REQUEST)
      }
    }
   
    
    public getCookieWithJwtToken(UserId:number){
    const payload:PayLoad = {UserId}
    const token = this.jwtservice.sign(payload);
       console.log(token)
    const cookie = {
      Authentication:token,
      cookieOptions:{
          maxAge:`${this.configService.get('JWT_EXPIRATION_TIME')*24*60*60*1000}` ,
      }
  }
  return cookie

  }
  
  public getCookieForLogout(){
    return `Authentication=; HttpOnly; Path=/; Max-Age=0 `
  }
}

export default AuthenticationService