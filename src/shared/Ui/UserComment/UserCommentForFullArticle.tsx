import { type FC } from 'react';
import { useParams } from 'react-router-dom';
import { type IComments, type IPosts } from '@/app/store/posts/interface';
import { ReactComponent as UpUseful } from '@/shared/Icons/up-useful.svg';
import { ReactComponent as DownUseful } from '@/shared/Icons/down-useful.svg';

import styles from './UserComment.module.scss';

interface IPropsComment {
  comments: IComments[] | [];
  updateHelpful: (post: IPosts) => void;
  post: IPosts;
}

export const UserCommentForFullArticle: FC<IPropsComment> = ({ comments, post, updateHelpful }) => {
  const { title } = useParams();

  const handleUpdateUp = (event: React.MouseEvent<HTMLDivElement>): void => {
    const element = event.target as HTMLDivElement;
    const div = element.closest('div');
    const commentID = div?.id;

    const newComments = comments.map((item) =>
      item.id === commentID ? { ...item, useful: item.useful + 1 } : item
    );
    if (element) {
      updateHelpful({ ...post, comments: newComments });
    }
  };

  const handleUpdateDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    const element = event.target as HTMLDivElement;
    const div = element.closest('div');
    const commentID = div?.id;

    const newComments = comments.map((item) =>
      item.id === commentID ? { ...item, useful: item.useful - 1 } : item
    );

    if (element) {
      updateHelpful({ ...post, comments: newComments });
    }
  };

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
                <div id={item.id} className={styles.useful__up} onClick={handleUpdateUp}>
                  <UpUseful />
                </div>
                <p>{item.useful}</p>
                <div id={item.id} className={styles.useful__down} onClick={handleUpdateDown}>
                  <DownUseful />
                </div>
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
