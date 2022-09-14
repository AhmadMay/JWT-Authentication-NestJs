import createUserDto from "../users/dto/createUserDto";
import { AuthenticationService } from "./auth.service";
import RequestWithUser from "./interface/requestWithUser";
import { Response } from "express";
export default class authController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signUp(data: createUserDto): Promise<import("../users/user.entity").UserEntity>;
    login(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
