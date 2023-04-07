import { type FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigateLink.module.scss';

interface ILinkProps {
  path: string;
  title: string;
}

export const NavigateLink: FC<ILinkProps> = ({ path, title }) => {
  return (
    <div className={styles.navigate__link}>
      <Link to={path}>{title}</Link>
    </div>
  );
};
