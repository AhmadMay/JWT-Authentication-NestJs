import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { RegisterDto } from "./dto/registerDto";

@Controller('auth')

export default class authController{
    constructor(private readonly authenticationService:AuthenticationService){}

    @Post('signUp')
    signUp(@Body() data:RegisterDto){
        return this.authenticationService.register(data)
    }
    


}