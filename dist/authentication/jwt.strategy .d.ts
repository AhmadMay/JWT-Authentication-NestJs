import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { UserService } from "../users/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly configService: ConfigService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: PayLoad): Promise<import("../users/user.entity").UserEntity>;
}
export {};
