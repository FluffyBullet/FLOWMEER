import React from 'react'
import styles from '../../styles/Comments.module.css'
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

const Comment = (props) => {

  const { profile_id, profile_image, owner, updated_at, content } = props;
  return (
    <div className={styles.CommentContainer}>
        <div className={styles.UserImage}>
          <Link to ={`/profiles/${profile_id}`}>
          <Avatar src={profile_image}/>
          </Link>
        </div>
        <div className={styles.UserComment}>
          <p className={styles.CommentHeader}>{owner}   <sup>{updated_at}</sup></p>
          <hr/>
          <p>{content}</p>
        </div>
    </div>
  )
}

export default Comment