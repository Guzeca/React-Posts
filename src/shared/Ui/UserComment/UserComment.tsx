import { type FC } from 'react';
import styles from './UserComment.module.scss';
import { useParams } from 'react-router-dom';
import { type IComments } from '@/app/store/posts/interface';

interface IPropsComment {
  value: IComments[] | [];
}

export const UserComment: FC<IPropsComment> = ({ value }) => {
  const { title } = useParams();

  return (
    <>
      {value.length >= 1 ? (
        !title ? (
          <div className={styles.comment}>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img src={value[0].avatar} alt="avatar" />
              </div>
              <div className={styles.desc}>
                <h3>{value[0].name}</h3>
                <p>{value[0].email}</p>
              </div>
            </div>
            <div className={styles.content}>
              <p>{value[0].body}</p>
            </div>
          </div>
        ) : (
          value?.map((item) => (
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
            </div>
          ))
        )
      ) : (
        <div>{'Комментариев нет. Будьте первыми!'}</div>
      )}
    </>
  );
};
