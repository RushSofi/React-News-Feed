import React from 'react';
import FeedItem from '../FeedItem/FeedItem';
import styles from './Feed.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
  date: string;
  image: string;
}

interface FeedProps {
  posts: Post[] | null;
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.loader}>Посты не найдены</p>;
  }

  return (
    <div className={styles.feedContainer}>
      {posts.map((item) => (
        <FeedItem
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          description={item.body}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Feed;
