import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/schemas/article.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private UserModel: Model<Article>,
  ) { }

  async create(createArticleDto: CreateArticleDto) {
    if (!createArticleDto?.user?.userId) throw new BadRequestException('userId-required', 'El id del usuario es obligatorio');
    if (!createArticleDto?.title) throw new BadRequestException('title-required', 'El titulo es obligatorio');
    if (!createArticleDto?.description) throw new BadRequestException('description-required', 'La descripcion es obligatoria');

    const article = new this.UserModel(createArticleDto);
    return article.save();
  }

  async findAll() {
    const article = await this.UserModel.find();
    return article;
  }

  async findAllByUser(userId: string) {
    const article = await this.UserModel.find({ user: userId });
    return article;
  }

  async findOne(_id: string) {
    if (!this.UserModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    const article = await this.UserModel.findById(_id);
    return article;
  }

  async update(_id: string, updateArticleDto: UpdateArticleDto) {
    if (!this.UserModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    if (!updateArticleDto?.title) throw new BadRequestException('title-required', 'El titulo es obligatorio');
    if (!updateArticleDto?.description) throw new BadRequestException('description-required', 'La descripcion es obligatoria');

    const article = await this.UserModel.findByIdAndUpdate(_id, updateArticleDto, { new: true });
    return article;
  }

  async remove(_id: string) {
    if (!this.UserModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    await this.UserModel.findByIdAndDelete(_id);
    return `This action removes a #${_id} article`;
  }
}
