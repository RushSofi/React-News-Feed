import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import icon from '../../assets/header.png';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerName}>
        <img src={icon} alt="Icon" className={styles.icon} />
        <h1>Sofia's Feed</h1>
        {(!(location.pathname === '/create')) && (
          <button
            className={styles.createPostButton}
            onClick={() => navigate('/create')}
          >
            Создать пост
          </button>
        )}
      </div>

      {location.pathname === '/' && (
        <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Поиск по заголовкам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" stroke="black" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="black" strokeWidth="2" />
            </svg>
          </button>
        </form>
      )}

      {(location.pathname.startsWith('/post') || location.pathname === '/create') && (
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          Вернуться назад в ленту
        </button>
      )}
    </header>
  );
};

export default Header;
