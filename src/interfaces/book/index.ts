export interface IBookRequest {
  title: string;
  author: string;
  published_date: Date;
  synopsis: string;
  pages: number;
  available: boolean
}

export interface IBookUpdate {
  title?: string;
  author?: string;
  published_date?: Date;
  synopsis?: string;
  pages?: number;
  available?: boolean
}
