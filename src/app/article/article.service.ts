import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/schemas/article.schema';
import { Model } from 'mongoose';
import { AbstractService } from 'src/interfaces/Abstract.service';

@Injectable()
export class ArticleService extends AbstractService<Article> {
  constructor(
    @InjectModel(Article.name) private ArticleModel: Model<Article>,
  ) {
    super(ArticleModel);
  }

  async create(createArticleDto: CreateArticleDto) {
    if (!createArticleDto?.user?.userId) throw new BadRequestException('userId-required', 'El id del usuario es obligatorio');
    if (!createArticleDto?.title) throw new BadRequestException('title-required', 'El titulo es obligatorio');
    if (!createArticleDto?.description) throw new BadRequestException('description-required', 'La descripcion es obligatoria');

    const article = new this.ArticleModel(createArticleDto);
    return article.save();
  }


  async findAllByUser(userId: string) {
    const article = await this.ArticleModel.find({ user: userId });
    return article;
  }

  async findOne(_id: string) {
    if (!this.ArticleModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    const article = await this.ArticleModel.findById(_id);
    return article;
  }

  async update(_id: string, updateArticleDto: UpdateArticleDto) {
    if (!this.ArticleModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    if (!updateArticleDto?.title) throw new BadRequestException('title-required', 'El titulo es obligatorio');
    if (!updateArticleDto?.description) throw new BadRequestException('description-required', 'La descripcion es obligatoria');

    const article = await this.ArticleModel.findByIdAndUpdate(_id, updateArticleDto, { new: true });
    return article;
  }

  async remove(_id: string) {
    if (!this.ArticleModel.exists({ _id })) throw new BadRequestException('article-not-found', 'El articulo no existe');
    await this.ArticleModel.findByIdAndDelete(_id);
    return `This action removes a #${_id} article`;
  }
}
