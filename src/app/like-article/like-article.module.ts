import { Module } from '@nestjs/common';
import { LikeArticleService } from './like-article.service';
import { LikeArticleController } from './like-article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeArticle, LikeArticleSchema } from 'src/schemas/like-article.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: LikeArticle.name, schema: LikeArticleSchema }])],
  controllers: [LikeArticleController],
  providers: [LikeArticleService],
  exports: [LikeArticleService],
})
export class LikeArticleModule {}
