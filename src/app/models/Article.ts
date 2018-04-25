export interface Article {
  title: string;
  id: string;
  thumbnail?: string;
  html?: string;
  url: string,
  preview?: ArticlePreview;
}

export interface ArticlePreview {
  image?: string;
  video?: string;
}
