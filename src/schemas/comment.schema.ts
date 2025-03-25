import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;


@Schema({ timestamps: true })
export class Comment {

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  article: {
    articleId: string;
    title: string;
  };

  @Prop({ required: true })
  user: {
    userId: string;
    username: string;
  };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);