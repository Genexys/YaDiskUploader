import React from 'react';
import styles from './Button.module.css';

type TProps = {
  children: React.ReactNode;
  theme?: 'yandex' | 'logout';
  onClick: () => void;
}

const Button: React.FC<TProps> = ({ children, theme, onClick }) => {
  
  const themeButton = theme ? styles[theme] : ''

  return <button className={styles.button + ' ' + themeButton} onClick={onClick}>{children}</button>;
};

export default Button;
