import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;


@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true})
  description: string;

  @Prop({ required: false})
  ubication: string;

  @Prop({ required: false})
  img: string;

  @Prop({ required: false})
  animalId: string;

  @Prop({ required: true, type: {
    userId: String,
    username: String
  }})
  user: {
    userId: string;
    username: string;
  };

  @Prop({ required: true })
  likes: number;

  @Prop({ required: true })
  comments: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);