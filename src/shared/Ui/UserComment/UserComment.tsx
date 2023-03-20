import { type FC, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserComment.module.scss';

interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const UserComment: FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers(): Promise<any> {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className={styles.main}>
      {users &&
        users.map((item: CommentType) => (
          <div className={styles.content} key={item.id}>
            <h4>{item.name}</h4>
            <p>{item.email}</p>
            <div className={styles.text}>{item.body}</div>
          </div>
        ))}
    </div>
  );
};
