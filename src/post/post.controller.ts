import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import PostService from './post.service';


@Controller('posts')
export default class PostController {
    constructor(private readonly postservice:PostService){}

    @Get(':id')
    getPost(@Param('id')id:string){
        return this.postservice.getById(Number(id));
    }

    @Get()
    getAllPosts(){
        return this.postservice.getAll()
    }
    @Post('createPost')
    create(@Body()post:CreatePostDto){
      return this.postservice.createPost(post)
    }

    @Patch(':id')
    updatePost(@Param('id') id : string, @Body() post : UpdatePostDto){
     return this.postservice.updatepost(Number(id),post)
    }

    
    @Delete(':id')
    deletePost(@Param('id')id :string){
      return this.postservice.deletePost(Number(id))
    }

}
