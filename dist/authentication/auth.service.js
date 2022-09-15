"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthenticationService = class AuthenticationService {
    constructor(userService, configService, jwtservice) {
        this.userService = userService;
        this.configService = configService;
        this.jwtservice = jwtservice;
    }
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {
            const createUser = await this.userService.createUser(Object.assign(Object.assign({}, data), { password: hashedPassword }));
            return createUser;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === "23505") {
                throw new common_1.HttpException('User with that email adress already exist', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getAuthenticatedUser(email, password) {
        try {
            const user = await this.userService.getByEmail(email);
            this.verifyPassword(password, user.password);
            user.password = undefined;
            console.log(user);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyPassword(password, hashedPassword) {
        try {
            const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('something want wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getCookieWithJwtToken(UserId) {
        console.log(UserId);
        const payload = { UserId };
        const token = this.jwtservice.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME') * 24 * 60 * 60 * 1000}s`
        });
        console.log(token);
        const cookie = {
            Authentication: token,
            cookieOptions: {
                maxAge: this.configService.get('JWT_EXPIRATION_TIME') * 24 * 60 * 60 * 1000,
            }
        };
        return cookie;
    }
    getCookieForLogout() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0 `;
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
exports.default = AuthenticationService;
//# sourceMappingURL=auth.service.js.map