import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type LikeArticleDocument = HydratedDocument<LikeArticle>;


@Schema({ timestamps: true })
export class LikeArticle {
  @Prop({ required: true, type: {
    articleId: String,
    title: String
  } })
  article: {
    articleId: string;
    title: string;
  };

  @Prop({ required: true, type: {
    userId: String,
    username: String
  } })
  user: {
    userId: string;
    username: string;
  };
}

export const LikeArticleSchema = SchemaFactory.createForClass(LikeArticle);