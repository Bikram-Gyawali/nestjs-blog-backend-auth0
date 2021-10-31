import { CreatePostDTO } from './createPost.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './post.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  //   get post by id
  async getPost(postId): Promise<Post> {
    const post = await this.postModel.findById(postId).exec();
    return post;
  }

  //   get all post
  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  //   create post
  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await new this.postModel(createPostDTO);
    return newPost.save();
  }

  //   update posts
  async updatePost(postId, createPostDTO: CreatePostDTO): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(
      postId,
      createPostDTO,
      { new: true },
    );
    return updatedPost;
  }

  async deletePost(postId): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndRemove(postId);
    return deletedPost;
  }
}
