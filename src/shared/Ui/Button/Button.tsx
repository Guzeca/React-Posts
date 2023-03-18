import { type ButtonHTMLAttributes, type FC } from 'react';
import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  SQUARE = 'square'
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  children: React.ReactNode;
}

export const Button: FC<IButtonProps> = (props) => {
  const { className, children, theme = ButtonTheme.CLEAR, ...otherProps } = props;
  return (
    <button
      type="button"
      className={clsx(styles.Button, { [styles[theme || ButtonTheme.CLEAR]]: true }, className)}
      {...otherProps}>
      {children}
    </button>
  );
};
