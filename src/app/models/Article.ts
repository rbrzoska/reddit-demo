export interface Article {
  title: string;
  id: string;
  shortId: string;
  subredditId?: string;
  thumbnail?: string;
  url: string;
  commentsCount: number;
  redditLink: string;
  preview?: ArticlePreview;
}
export type PreviewType = 'text' | 'image' | 'gif' | 'video';

export interface ArticlePreview {
  type: 'text' | 'image' ;
  url?: string;
  data?: string;
}
