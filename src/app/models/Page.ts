export interface Page<T> {
  previousPageId: string;
  nextPageId: string;
  items: T[];
}
