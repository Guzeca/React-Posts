export interface ICategories {
  id: number;
  name: string;
}

export interface IPostByCategory {
  id: string;
  title: string;
  rating: number;
  ratingArr: number[] | [];
  description: string;
  images: string;
  creationAt: string;
  category: string[];
  comments: IComments[] | [];
}

export interface IComments {
  avatar: string;
  email: string;
  id: string;
  name: string;
  body: string;
  useful: number;
}

export enum SortByType {
  FRESH = 'creationAt',
  POPULAR = 'rating'
}

export interface ICategoryId {
  searchValue: string;
  category: string;
  sortBy: SortByType;
}
