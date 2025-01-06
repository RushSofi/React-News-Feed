import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, removeComment, removePost } from '../../store/slices/postsSlice';
import trash from '../../assets/trash.png';

interface Comment {
  id: number;
  name: string;
  text: string;
}

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );
  const comments = useSelector((state: RootState) =>
    post?.id ? state.posts.comments[post.id] || [] : []
  );

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return <p>Пост не найден</p>;
  }

  const handleAddComment = () => {
    if (commentName.trim() && commentText.trim()) {
      dispatch(addComment({ postId: post.id, name: commentName, text: commentText }));
      setCommentName('');
      setCommentText('');
    }
  };

  const handleDeletePost = () => {
    dispatch(removePost({ id: post.id }));
    navigate('/');
  };

  return (
    <div className={styles.postContainer}>
      <button onClick={handleDeletePost} className={styles.postDeleteButton}>
        <img src={trash} alt="Удалить пост" />
      </button>
      <p>{post.date}</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <img className={styles.postContainer} src={post.image} alt={post.title} />
      <h3>Комментарии</h3>
      <div className={styles.commentsSection}>
        {comments.map((comment: Comment) => (
          <div key={comment.id} className={styles.comment}>
            <p>
              <strong>{comment.name}:</strong> {comment.text}
            </p>
            <button
              onClick={() => dispatch(removeComment({ postId: post.id, commentId: comment.id }))}
              className={styles.deleteButton}
            >
              <img src={trash} alt="Удалить комментарий" />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.commentForm}>
        <input
          type="text"
          placeholder="Введите имя..."
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Введите текст..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Отправить</button>
      </div>
    </div>
  );
};

export default Post;
