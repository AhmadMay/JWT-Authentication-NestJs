import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import createUserDto from "./dto/createUserDto";



@Controller('User')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Post('/createUser')
    creating(@Body()User:createUserDto){
     return this.userService.createUser(User)
    }

    @Get('getAllUsers')
    getAll(){
        return this.userService.getAllUsers()
    }

    
}