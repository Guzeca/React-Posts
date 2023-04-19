import { type FC } from 'react';
import { ReactComponent as Star } from '@/shared/Icons/star.svg';

import './StarsForPosts.scss';

interface IRatingProps {
  rating: number;
}
const totalRating = 10;

export const StarsForPosts: FC<IRatingProps> = ({ rating }) => {
  const currentRating = rating * 2;

  return (
    <div className="half-stars">
      <div className="rating-group">
        {[...new Array(totalRating)].map((_, i) => (
          <div key={i} className={(i + 1) % 2 === 0 ? '' : 'hsr'}>
            <Star className={currentRating >= i + 1 ? 'active' : 'blank'} />
          </div>
        ))}
      </div>
    </div>
  );
};
