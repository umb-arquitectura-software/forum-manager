import { IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  ubication: {
    coordenates: number[];
    country: string;
    city: string;
  }

  @IsString()
  img: string;

  @IsString()
  animalId: string;

  user: {
    userId: string;
    username: string;
  }

  @IsNumber()
  likes: number;

  @IsNumber()
  comments: number;
}
