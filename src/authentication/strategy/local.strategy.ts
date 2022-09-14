import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserEntity } from "../../users/user.entity";
import AuthenticationService from "../auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private AuthenticationService:AuthenticationService){
    super({
        usernameField:'email'
    });
  }
  async validate(email:string,password:string):Promise<UserEntity>{
    return this.AuthenticationService.getAuthenticatedUser(email,password)
  }

}