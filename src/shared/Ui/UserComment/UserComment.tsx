import { type FC } from 'react';
import styles from './UserComment.module.scss';
import { useGetCommentsQuery } from '@/app/store/comment/commentAPI';

export const UserComment: FC = () => {
  const { data, isLoading, error } = useGetCommentsQuery(6);
  return (
    <>
      {isLoading ? (
        <div>{'Загрузка...'}</div>
      ) : error ? (
        <div>{'Не удалось загрузить'}</div>
      ) : (
        data?.map((item) => (
          <div key={item.id} className={styles.comment}>
            <div className={styles.profile}>
              <div>
                <img className={styles.avatar} src={item.avatar} alt="avatar" />
              </div>
              <div className={styles.desc}>
                <h3>{item.name}</h3>
                <p>{item.email}</p>
              </div>
            </div>
            <div className={styles.content}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut quia, expedita
                debitis consequuntur accusantium officiis, velit cupiditate quisquam rem voluptatum
                sed commodi labore, quo reprehenderit assumenda impedit suscipit magni!
              </p>
            </div>
          </div>
        ))
      )}
    </>
  );
};
