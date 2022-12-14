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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./post.entity");
let PostService = class PostService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async getAll() {
        const posts = await this.postsRepository.find();
        if (posts) {
            return posts;
        }
        else {
            throw new common_1.HttpException("something went wrong", common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getById(id) {
        const post = await this.postsRepository.findOne({ where: { id } });
        if (post) {
            return post;
        }
        else {
            throw new common_1.HttpException('something went wrong', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createPost(post) {
        const creatPost = this.postsRepository.create(post);
        await this.postsRepository.save(creatPost);
        if (creatPost) {
            return creatPost;
        }
        else {
            throw new common_1.HttpException('something went wrong', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updatepost(id, post) {
        await this.postsRepository.update(id, post);
        const updatePost = this.postsRepository.findOne({ where: { id } });
        if (!updatePost) {
            throw new common_1.HttpException('something went wrong', common_1.HttpStatus.NOT_FOUND);
        }
        return updatePost;
    }
    async deletePost(id) {
        const deletePost = await this.postsRepository.delete(id);
        if (!deletePost.affected) {
            throw new common_1.HttpException('not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
exports.PostService = PostService;
exports.default = PostService;
//# sourceMappingURL=post.service.js.map