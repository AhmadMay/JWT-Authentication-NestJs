import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "src/post/post.entity";
import { UserService } from "./user.service";

@Module({
    imports:[TypeOrmModule.forFeature([PostEntity])],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule {}