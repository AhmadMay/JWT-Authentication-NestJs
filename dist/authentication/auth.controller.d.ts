import { AuthenticationService } from "./auth.service";
import { RegisterDto } from "./dto/registerDto";
export default class authController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signUp(data: RegisterDto): Promise<import("../users/user.entity").UserEntity>;
}
