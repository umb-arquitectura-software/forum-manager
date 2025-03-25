import { IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  text: string;

  article: {
    articleId: string;
    title: string;
  };

  user: {
    userId: string;
    username: string;
  };
}
