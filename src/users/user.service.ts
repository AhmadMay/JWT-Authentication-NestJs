import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUserDto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService{
   
    constructor(@InjectRepository(UserEntity)
          private UserRepository:Repository<UserEntity>
    ){}

    async create(user:createUserDto){
        const newUser= this.UserRepository.create(user)
         await this.UserRepository.save(newUser)
           return newUser;
    }

    async getByEmail(email:string){
    const user = await this.UserRepository.findOne({where:{email}})
     if (user){
        return user
     }else {
        throw new HttpException('user not found',HttpStatus.NOT_FOUND)
     }

    }

}