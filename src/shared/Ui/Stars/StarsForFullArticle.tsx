import { type FC } from 'react';
import { type IPosts } from '@/app/store/posts/interface';
import './Stars.scss';

interface StarsItemProps {
  update: (data: IPosts) => void;
  post: IPosts;
}

export const StarsForFullArticle: FC<StarsItemProps> = ({ post, update }) => {
  const handleUpdate = (event: React.FormEvent<HTMLInputElement>): void => {
    const element = event.target as HTMLInputElement;
    if (element) {
      const item = Number(element.value);
      const ratingArr = [...post.ratingArr, item];
      const rating = Number(
        ([...ratingArr].reduce((a, b) => a + b, 0) / ratingArr.length).toFixed(1)
      );
      update({ ...post, rating, ratingArr });
    }
  };

  return (
    <div className="rating-area">
      <input onClick={handleUpdate} type="radio" id="star-5" name="rating" value="5" />
      <label htmlFor="star-5" title="Оценка «5»"></label>
      <input onClick={handleUpdate} type="radio" id="star-4" name="rating" value="4" />
      <label htmlFor="star-4" title="Оценка «4»"></label>
      <input onClick={handleUpdate} type="radio" id="star-3" name="rating" value="3" />
      <label htmlFor="star-3" title="Оценка «3»"></label>
      <input onClick={handleUpdate} type="radio" id="star-2" name="rating" value="2" />
      <label htmlFor="star-2" title="Оценка «2»"></label>
      <input onClick={handleUpdate} type="radio" id="star-1" name="rating" value="1" />
      <label htmlFor="star-1" title="Оценка «1»"></label>
    </div>
  );
};
