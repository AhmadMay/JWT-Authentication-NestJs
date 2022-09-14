import { Strategy } from "passport-local";
import { UserEntity } from "../users/user.entity";
import AuthenticationService from "./auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private AuthenticationService;
    constructor(AuthenticationService: AuthenticationService);
    validate(email: string, password: string): Promise<UserEntity>;
}
export {};
