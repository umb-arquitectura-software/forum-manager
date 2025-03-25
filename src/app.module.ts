import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { config } from './config/config';
import { ArticleModule } from './app/article/article.module';
import { CommentModule } from './app/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().mongodb.database.connectionString),
    ArticleModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
