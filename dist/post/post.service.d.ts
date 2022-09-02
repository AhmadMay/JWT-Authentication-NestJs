import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import PostEntity from './post.entity';
export declare class PostService {
    private postsRepository;
    constructor(postsRepository: Repository<PostEntity>);
    getAll(): Promise<PostEntity[]>;
    getById(id: number): Promise<PostEntity>;
    createPost(post: CreatePostDto): Promise<PostEntity>;
    updatepost(id: number, post: UpdatePostDto): Promise<PostEntity>;
    deletePost(id: number): Promise<void>;
}
export default PostService;
