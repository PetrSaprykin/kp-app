import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  activeTab: string;
}

export const Header = ({ activeTab }: HeaderProps) => {
  return (
    <header>
      <h1 className={styles.title}>
        Кинотека<span>ВКонтакте стажировка, Пётр Сапрыкин</span>
      </h1>
      <ul>
        <li>
          <Link
            to="/"
            className={`${styles.headerItem} ${activeTab === 'home' ? styles.active : ''}`}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={`${styles.headerItem} ${activeTab === 'favorites' ? styles.active : ''}`}
          >
            Избранное
          </Link>
        </li>
      </ul>
    </header>
  );
};
