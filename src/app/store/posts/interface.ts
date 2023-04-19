export interface IPosts {
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

export interface IPost {
  post: TypeOfPosts;
  limit: number;
}

export interface IComments {
  avatar: string;
  email: string;
  id: string;
  name: string;
  body: string;
}

export enum TypeOfPosts {
  REGULAR = 'regular',
  CATEGORY = 'category',
  SEARCH = 'search'
}
