import { UserService } from "src/users/user.service";
import { RegisterDto } from "./dto/registerDto";
export declare class AuthenticationService {
    private readonly userService;
    constructor(userService: UserService);
    register(data: RegisterDto): Promise<import("../users/user.entity").UserEntity>;
    getAuthenticatedUser(email: string, password: string): Promise<import("../users/user.entity").UserEntity>;
    verifyPassword(password: string, hashedPassword: string): Promise<void>;
}
