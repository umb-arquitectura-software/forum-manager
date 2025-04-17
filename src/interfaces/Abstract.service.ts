
import { Model } from 'mongoose';
import PageableQueryDto from './pageableQueryDto';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractService<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }


  async findAllPageable(page: PageableQueryDto) {
    if (!page.page) page.page = {page: 0, limit: 10};
    if (!page?.page?.limit) page.page.limit = 10;
    if (!page?.page?.page) page.page.page = 0;

    const data = await this.model
    .find(page.query || {})
    .sort({ createdAt: -1 })
    .skip(page.page.page * page.page.limit)
    .limit(page.page.limit)
    .populate(page.populate || [])
    .select(page.select || '-updatedAt')
    .exec();

    const total = await this.model.countDocuments(page.query || {}).exec();
    return {
      data,
      total,
      totalPages: Math.ceil(total / page.page.limit),
      limit: page.page.limit,
      page: page.page.page,
    }
  }


  async findOneQuery(query: Record<string, any>) {
    const find = await this.model.findOne(query).exec();
    if (!find) throw `${this.model.name} not found`;
    return find;
  }


  async findAll() {
    return this.model.find().exec();
  }

  async findOne(_id: string) {
    const find = await this.model.findById(_id).exec();
    return find;
  }
}