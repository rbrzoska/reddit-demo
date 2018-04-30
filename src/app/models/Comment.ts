export interface Comment {
  id?: number;
  text: string;
}

export interface CommentsMap {
  [key: string]: Comment[];
}
