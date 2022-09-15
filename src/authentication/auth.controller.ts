import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import createUserDto from "../users/dto/createUserDto";
import { AuthenticationService } from "./auth.service";
import RequestWithUser from "./interface/requestWithUser";
import { LocalAuthenticationGuard } from "./guards/localAuthentication.guard";
import { Response } from "express";
import  JwtAuthenticationGuard  from "./guards/jwtAuthenticationGuard";

@Controller('auth')
export default class authController{
    constructor(private readonly authenticationService:AuthenticationService){}

    @Post('signUp')
    signUp(@Body() data:createUserDto){
        return this.authenticationService.register(data)
    }
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('LogIn')
    async login (@Req() req:RequestWithUser,@Res() res:Response){
        const {user} = req
        const myCookie=  this.authenticationService.getCookieWithJwtToken(user.id)        
        user.password=undefined
        res.cookie('Authentication',myCookie.Authentication,myCookie.cookieOptions)
        return res.send(user)
    }


    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logout(@Req() req:RequestWithUser, @Res() res: Response){
        res.cookie('Authentication', null,{})
        return res.sendStatus(200);
    }
}
