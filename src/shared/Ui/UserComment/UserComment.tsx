import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { type IComments } from '@/app/store/posts/interface';
import { ReactComponent as UpUseful } from '@/shared/Icons/up-useful.svg';
import { ReactComponent as DownUseful } from '@/shared/Icons/down-useful.svg';

import styles from './UserComment.module.scss';

interface IPropsComment {
  comments: IComments[] | [];
}

export const UserComment: FC<IPropsComment> = ({ comments }) => {
  const { title } = useParams();

  return (
    <>
      {comments.length >= 1 ? (
        !title ? (
          <div className={styles.comment}>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src={comments[0].avatar} alt="avatar" />
              </div>
              <div className={styles.desc}>
                <h3>{comments[0].name}</h3>
                <p>{comments[0].email}</p>
              </div>
            </div>
            <div className={styles.content}>
              <p>{comments[0].body}</p>
            </div>
            <div className={styles.useful}>
              <p>{comments[0].useful}</p>
            </div>
          </div>
        ) : (
          comments?.map((item) => (
            <div key={item.id} className={styles.comment}>
              <div className={styles.profile}>
                <div className={styles.avatar}>
                  <img src={item.avatar} alt="avatar" />
                </div>
                <div className={styles.desc}>
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                </div>
              </div>
              <div className={styles.content}>
                <p>{item.body}</p>
              </div>
              <div className={styles.useful}>
                <UpUseful className={styles.useful__up} />
                <p>{item.useful}</p>
                <DownUseful className={styles.useful__down} />
              </div>
            </div>
          ))
        )
      ) : (
        <div>{'Комментариев нет. Будьте первыми!'}</div>
      )}
    </>
  );
};
