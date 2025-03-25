import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeArticleDto } from './create-like-article.dto';
import { IsString } from 'class-validator';

export class UpdateLikeArticleDto extends PartialType(CreateLikeArticleDto) {
  @IsString()
  _id: string;
}
