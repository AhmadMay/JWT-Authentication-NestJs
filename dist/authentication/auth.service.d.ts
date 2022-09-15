import { UserService } from "../users/user.service";
import createUserDto from "../users/dto/createUserDto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthenticationService {
    private readonly userService;
    private readonly configService;
    private readonly jwtservice;
    constructor(userService: UserService, configService: ConfigService, jwtservice: JwtService);
    register(data: createUserDto): Promise<import("../users/user.entity").UserEntity>;
    getAuthenticatedUser(email: string, password: string): Promise<import("../users/user.entity").UserEntity>;
    private verifyPassword;
    getCookieWithJwtToken(UserId: number): {
        Authentication: string;
        cookieOptions: {
            maxAge: number;
        };
    };
    getCookieForLogout(): string;
}
export default AuthenticationService;
