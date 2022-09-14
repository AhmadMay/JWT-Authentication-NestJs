import { Repository } from "typeorm";
import { createUserDto } from "./dto/createUserDto";
import { UserEntity } from "./user.entity";
export declare class UserService {
    private UserRepository;
    constructor(UserRepository: Repository<UserEntity>);
    createUser(user: createUserDto): Promise<UserEntity>;
    getByEmail(email: string): Promise<UserEntity>;
    getById(id: number): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
}
