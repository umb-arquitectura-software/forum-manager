import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeArticleService } from './like-article.service';
import { CreateLikeArticleDto } from './dto/create-like-article.dto';
import { UpdateLikeArticleDto } from './dto/update-like-article.dto';
import PageableQueryDto from 'src/interfaces/pageableQueryDto';

@Controller('like-article')
export class LikeArticleController {
  constructor(private readonly likeArticleService: LikeArticleService) {}

  @Post()
  create(@Body() createLikeArticleDto: CreateLikeArticleDto) {
    return this.likeArticleService.create(createLikeArticleDto);
  }

  @Get('my-likes/:userId')
  findAllByUserIdShot(@Param('userId') userId: string) {
    return this.likeArticleService.findAllByUserIdShot(userId);
  }

  @Get('by-article/:articleId')
  findAllByArticleId(@Param('articleId') articleId: string) {
    return this.likeArticleService.findAllByArticleId(articleId);
  }

  @Post('/pageable')
  findAllPageable(@Body() query: PageableQueryDto) {
    return this.likeArticleService.findAllPageable(query);
  }

  @Get()
  findAll() {
    return this.likeArticleService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.likeArticleService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateLikeArticleDto: UpdateLikeArticleDto) {
    return this.likeArticleService.update(_id, updateLikeArticleDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.likeArticleService.remove(_id);
  }
}
