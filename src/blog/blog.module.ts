import { AuthenticationMiddleware } from './common/authentication.middlewaare';
import { BlogSchema } from './schemas/blog.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: '/blog/post' },
        { method: RequestMethod.PUT, path: '/blog/update' },
        { method: RequestMethod.DELETE, path: '/blog/delete' },
      );
  }
}
