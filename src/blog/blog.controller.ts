import { CreatePostDTO } from './createPost.dto';
import {
  Body,
  Controller,
  Res,
  Post,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ValidateObjectId } from './shared/pipes/validateObjectid.pipes';
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // submit a post
  @Post('/post')
  async createPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.createPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully',
      post: newPost,
    });
  }

  //   get  all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  //  get single post by id
  @Get('post/:postId')
  async getPost(@Res() res, @Param('postId', new ValidateObjectId()) postId) {
    const post = await this.blogService.getPost(postId);
    if (!post) {
      throw new NotFoundException('Post does not exist of id' + postId);
    }
    return res.status(HttpStatus.OK).json(post);
  }

  //   updated post
  @Put('/update')
  async updatePost(
    @Res() res,
    @Query('postId', new ValidateObjectId()) postId,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    const updatedPost = await this.blogService.updatePost(
      postId,
      createPostDTO,
    );
    if (!updatedPost) {
      throw new NotFoundException('post does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: updatedPost,
    });
  }

  //   delete post
  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('postId', new ValidateObjectId()) postId,
  ) {
    const deletedPost = await this.blogService.deletePost(postId);
    if (!deletedPost) {
      throw new NotFoundException('Post does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      post: deletedPost,
    });
  }
}
