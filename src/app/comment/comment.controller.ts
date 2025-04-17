import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import PageableQueryDto from 'src/interfaces/pageableQueryDto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('by-article/:article_Id')
  findAllByArticle(@Param('article_Id') article_Id: string) {
    return this.commentService.findAllByArticle(article_Id);
  }

  @Post('/pageable')
  findAllPageable(@Body() query: PageableQueryDto) {
    return this.commentService.findAllPageable(query);
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.commentService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(_id, updateCommentDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.commentService.remove(_id);
  }
}
