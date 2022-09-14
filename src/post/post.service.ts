import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import PostEntity from './post.entity';



@Injectable()
export class PostService {

    constructor(@InjectRepository(PostEntity) 
    private postsRepository:Repository<PostEntity>
    ){}

    async getAll(){

      const posts=await this.postsRepository.find() 
      if(posts){
      return posts
      }else{
        throw new HttpException("something went wrong",HttpStatus.NOT_FOUND)
      }
    }
    
    async getById(id : number){
        const post = await this.postsRepository.findOne({where:{id}})
        if (post){
        return post
        }else{
            throw new HttpException('something went wrong', HttpStatus.NOT_FOUND)
        }
    }

    async createPost(post:CreatePostDto){
        const creatPost= this.postsRepository.create(post)
        await this.postsRepository.save(creatPost)
        if (creatPost){
        return creatPost
     }else{
      throw new HttpException('something went wrong',HttpStatus.NOT_FOUND)
    }
    }

    async updatepost(id:number,post:UpdatePostDto){
     await this.postsRepository.update(id,post)
     const updatePost=this.postsRepository.findOne({where:{id}})
        if (!updatePost){
        throw new HttpException('something went wrong',HttpStatus.NOT_FOUND)
    }
    return updatePost
    }

    async deletePost(id:number){
        const deletePost=await this.postsRepository.delete(id)
        
        if (!deletePost.affected){
         throw new HttpException('not found',HttpStatus.NOT_FOUND)   
        }
    }
    
}

export default PostService;