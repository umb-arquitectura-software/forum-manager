import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeArticleDto } from './dto/create-like-article.dto';
import { UpdateLikeArticleDto } from './dto/update-like-article.dto';
import { LikeArticle } from 'src/schemas/like-article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LikeArticleService {

  constructor(
    @InjectModel(LikeArticle.name) private LikeArticleModel: Model<LikeArticle>
  ) {  }


  async create(createLikeArticleDto: CreateLikeArticleDto) {
    if (!createLikeArticleDto?.article?.articleId) throw  new BadRequestException('articleId is required');
    if (!createLikeArticleDto?.article?.title) throw  new BadRequestException('title is required');
    if (!createLikeArticleDto?.user?.userId) throw  new BadRequestException('userId is required');
    if (!createLikeArticleDto?.user?.username) throw  new BadRequestException('username is required');
    const newLikeArticle = new this.LikeArticleModel(createLikeArticleDto);
    return await newLikeArticle.save();
  }

  async findAllByUserIdShot(userId: string) {
    const likes = await this.LikeArticleModel.find({ user: { userId } }).select('_id').lean();
    return likes?.map(like => like._id);
  }
  
  async findAllByArticleId(articleId: string) {
    const likes = await this.LikeArticleModel.find({ article: { articleId } }).select('_id').lean();
    return likes?.map(like => like._id);
  }

  async findAll() {
    return await this.LikeArticleModel.find().lean();
  }

  async findOne(_id: string) {
    return await this.LikeArticleModel.findById(_id).lean();
  }

  async update(_id: string, updateLikeArticleDto: UpdateLikeArticleDto) {
    if (!_id) throw new BadRequestException('_id is required');
    const likeArticle = await this.LikeArticleModel.findById(_id);
    if (!likeArticle) throw new BadRequestException('LikeArticle not found');

    const article = await this.LikeArticleModel.findByIdAndUpdate(_id, updateLikeArticleDto, { new: true });
    return article;
  }

  async remove(_id: string) {
    if (!_id) throw new BadRequestException('_id is required');
    const likeArticle = await this.LikeArticleModel.findByIdAndDelete(_id);
    if (!likeArticle) throw new BadRequestException('LikeArticle not found');
    return `This action removes a #${_id} likeArticle`;
  }
}
