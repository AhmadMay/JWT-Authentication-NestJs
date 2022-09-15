import { Injectable, } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../users/user.service";

// @Injectable()
// export class JWTStrategy extends PassportStrategy(Strategy){
    
//     constructor(
//         private readonly configService:ConfigService,
//         private readonly userService:UserService){


//             super ({
//                 jwtFromRequest:ExtractJwt.fromExtractors([(request:Request)=>{
//                     return request?.cookies?.Authentication;
//                 }]),
                
//                 secretOrKey:process.env.JWT_SECRET || "here_is_my_secrete_of_jwt_now_lets_go"
                
//             })
//         }

//     async validate(payload:PayLoad){
//         return this.userService.getById(payload.UserId)

//     }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        
               
        return request?.cookies?.Authentication;
        
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: PayLoad) {
    console.log(payload)
    return this.userService.getById(payload.UserId);
  }
}