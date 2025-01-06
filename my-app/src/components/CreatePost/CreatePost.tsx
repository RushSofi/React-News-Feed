import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addPost } from '../../store/slices/postsSlice';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';

const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && body) {
      dispatch(
        addPost({
          id: Date.now(),
          title,
          body,
          date: new Date().toLocaleDateString(),
          image,
          comments: [],
        })
      );
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createPostForm}>
      <h2>Добавить новый пост</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Содержание"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div className={styles.buttonGroup}>
        <button onClick={handleCancel} className={styles.cancelButton}>Отменить</button>
        <button type="submit" className={styles.addButton}>Добавить</button>
      </div>
    </form>
  );
};

export default CreatePost;
