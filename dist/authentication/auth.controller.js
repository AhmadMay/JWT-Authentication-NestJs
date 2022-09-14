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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const createUserDto_1 = require("../users/dto/createUserDto");
const auth_service_1 = require("./auth.service");
const localAuthentication_guard_1 = require("./guards/localAuthentication.guard");
const jwtAuthenticationGuard_1 = require("./guards/jwtAuthenticationGuard");
let authController = class authController {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    signUp(data) {
        return this.authenticationService.register(data);
    }
    async login(req, res) {
        const { user } = req;
        const myCookie = this.authenticationService.getCookieWithJwtToken(user.id);
        user.password = undefined;
        res.cookie('Authentication', myCookie);
        return res.send(user);
    }
    async logout(req, res) {
        res.cookie('Authentication', null, {});
        return res.sendStatus(200);
    }
};
__decorate([
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.default]),
    __metadata("design:returntype", void 0)
], authController.prototype, "signUp", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(localAuthentication_guard_1.LocalAuthenticationGuard),
    (0, common_1.Get)('LogIn'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthenticationGuard_1.default),
    (0, common_1.Post)('log-out'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "logout", null);
authController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService])
], authController);
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map