import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;


@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true})
  description: string;

  @Prop({ required: false, type: {
    coordenates: [Number],
    country: String,
    city: String
  }})
  ubication: {
    coordenates: number[];
    country: string;
    city: string;
  }

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

  @Prop({ required: false, default: 0 })
  likes: number;

  @Prop({ required: false, default: 0 })
  comments: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);