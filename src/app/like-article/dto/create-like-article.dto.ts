export class CreateLikeArticleDto {
  article: {
    articleId: string;
    title: string;
  };

  user: {
    userId: string;
    username: string;
  };
}
