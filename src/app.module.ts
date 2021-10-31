import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { DB_PASS } from './db/db.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://bikram:${DB_PASS}@cluster0.jhmiu.mongodb.net/nestcrud?retryWrites=true&w=majority`,
    ),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
