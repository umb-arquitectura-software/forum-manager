import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {

  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<Comment>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    if (!createCommentDto?.user?.userId) throw new BadRequestException('userId-required', 'El id del usuario es obligatorio');
    if (!createCommentDto?.text) throw new BadRequestException('text-required', 'El texto es obligatorio');
    if (!createCommentDto?.article?.articleId) throw new BadRequestException('articleId-required', 'El id del articulo es obligatorio');
    if (!createCommentDto?.article?.title) throw new BadRequestException('title-required', 'El titulo del articulo es obligatorio');

    const comment = new this.CommentModel(createCommentDto);
    return comment.save();
  }

  async findAll() {
    const comments = await this.CommentModel.find();
    return comments;
  }

  async findAllByArticle(articleId: string) {
    const comments = await this.CommentModel.find({ article: articleId });
    return comments;
  }

  async findAllByUser(userId: string) {
    const comments = await this.CommentModel.find({ user: userId });
    return comments;
  }

  async findAllByArticleAndUser(articleId: string, userId: string) {
    const comments = await this.CommentModel.find({ article: articleId, user: userId });
    return comments;
  }

  async findAllByUserAndArticle(userId: string, articleId: string) {
    const comments = await this.CommentModel.find({ user: userId, article: articleId });
    return comments;
  } 

  async findOne(id: string) {
    if (!this.CommentModel.exists({ _id: id })) throw new BadRequestException('comment-not-found', 'El comentario no existe');
    const comment = await this.CommentModel.findById(id);
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    if (!this.CommentModel.exists({ _id: id })) throw new BadRequestException('comment-not-found', 'El comentario no existe');
    const comment = await this.CommentModel.findByIdAndUpdate(id, updateCommentDto, { new: true });
    return comment;
  }

  async remove(id: string) {
    if (!this.CommentModel.exists({ _id: id })) throw new BadRequestException('comment-not-found', 'El comentario no existe');
    await this.CommentModel.findByIdAndDelete(id);
    return `This action removes a #${id} comment`;
  }
}
