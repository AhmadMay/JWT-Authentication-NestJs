import CreatePostDto from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import PostService from './post.service';
export default class PostController {
    private readonly postservice;
    constructor(postservice: PostService);
    getPost(id: string): Promise<import("./post.entity").PostEntity>;
    getAllPosts(): Promise<import("./post.entity").PostEntity[]>;
    create(post: CreatePostDto): Promise<import("./post.entity").PostEntity>;
    updatePost(id: string, post: UpdatePostDto): Promise<import("./post.entity").PostEntity>;
    deletePost(id: string): Promise<void>;
}
