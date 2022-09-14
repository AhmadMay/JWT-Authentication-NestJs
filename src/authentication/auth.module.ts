import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../users/user.module";
import authController from "./auth.controller";
import { AuthenticationService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy ";
import JwtAuthenticationGuard from "./guards/jwtAuthenticationGuard";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports:[
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({})
    ],
    controllers:[authController,],
    providers:[AuthenticationService,LocalStrategy,JwtStrategy,JwtAuthenticationGuard],
    exports:[AuthenticationService]
})

export class AtuhenticationModule{}