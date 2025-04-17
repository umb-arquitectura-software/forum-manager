import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import PageableQueryDto from 'src/interfaces/pageableQueryDto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Post('/pageable')
  findAllPageable(@Body() query: PageableQueryDto) {
    return this.articleService.findAllPageable(query);
  }

  @Get('by-user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.articleService.findAllByUser(userId);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.articleService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(_id, updateArticleDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.articleService.remove(_id);
  }
}
