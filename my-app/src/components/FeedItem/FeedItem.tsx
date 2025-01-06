import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeedItem.module.css';

interface FeedItemProps {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ id, title, date, description, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/post/${id}`);
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const previewText = description.split(' ').slice(0, 5).join(' ') + (description.split(' ').length > 5 ? '...' : '');

  return (
    <div className={styles.feedItem}>
      <div className={styles.newsContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.date}>{date}</span>
        </div>
        <p className={styles.description}>
          {isExpanded ? description : previewText}
          {description.split(' ').length > 5 && (
            <button onClick={toggleText} className={styles.toggleButton}>
              {isExpanded ? 'Hide' : 'see more'}
            </button>
          )}
        </p>
        <img src={image} alt={title} className={styles.image} />
        <button onClick={handleNavigate} className={styles.readMore}>
          open →
        </button>
      </div>
    </div>
  );
};

export default FeedItem;
