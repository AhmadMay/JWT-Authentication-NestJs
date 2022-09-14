import { UserService } from "../users/user.service";
import createUserDto from "../users/dto/createUserDto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthenticationService {
    private readonly userService;
    private readonly jwtservice;
    constructor(userService: UserService, jwtservice: JwtService);
    private readonly configService;
    register(data: createUserDto): Promise<import("../users/user.entity").UserEntity>;
    getAuthenticatedUser(email: string, password: string): Promise<import("../users/user.entity").UserEntity>;
    private verifyPassword;
    getCookieWithJwtToken(UserId: number): {
        Authentication: string;
        cookieOptions: {
            maxAge: string;
        };
    };
    getCookieForLogout(): string;
}
export default AuthenticationService;
