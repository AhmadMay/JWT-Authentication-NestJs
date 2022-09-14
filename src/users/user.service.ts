import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUserDto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService{
   
    constructor(
      @InjectRepository(UserEntity)
          private UserRepository:Repository<UserEntity>
    ){}

    async createUser(user:createUserDto){
      console.log("before creating user in user service")
        const newUser= this.UserRepository.create(user)
         await this.UserRepository.save(newUser)
           return newUser;

    }

    async getByEmail(email:string){
      try {
         const user = await this.UserRepository.findOne({where:{email}})
          if (user){
             return user
          }else {
          throw new HttpException('user not found',HttpStatus.NOT_FOUND)
         }
      } catch (error) {
         throw new HttpException("something went wrong", HttpStatus.BAD_REQUEST)
      }
     

    }
  //   async getById(id:number){      
  //     const User= await this.UserRepository.findOne({where:{id}})
  //     if(User){
  //     return User
  //   }else{
  //     throw new HttpException('There is no such id please sign up',HttpStatus.BAD_REQUEST)
  //   }
  //  }
   async getById(id: number) {
    const user = await this.UserRepository.findOne({ where:{id} });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
    async getAllUsers(){
      const getAll=await this.UserRepository.find()
      return getAll
    }
}