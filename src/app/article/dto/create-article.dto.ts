import { IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  ubication: string;

  @IsString()
  img: string;

  @IsString()
  animalId: string;

  user: {
    userId: string;
    username: string;
  }
}
