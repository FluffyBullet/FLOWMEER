import React, {useState} from 'react'
import styles from '../../styles/Comments.module.css'
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { PostOptions } from '../../components/PostOptions';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from './CommentEditForm';

const Comment = (props) => {

  const { profile_id, profile_image, owner, updated_at, content, id, setPost, setComments, } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`)
      setPost(prevPost => ({
        results: [{
          ...prevPost.results [0],
          comments_count: prevPost.results[0].comments_count - 1
        }]
      }))

      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter((Comment) = Comment.id !== id),
      }))
    } catch(err){
      console.log(err)
  }
}

  return (
    <>
    <div className={styles.CommentContainer}>
        <div className={styles.UserImage}>
          <Link to ={`/profiles/${profile_id}`}>
          <Avatar src={profile_image}/>
          </Link>
        </div>
        <div className={styles.UserComment}>
          <p className={styles.CommentHeader}>{owner}   <sup>{updated_at}</sup></p>
          <hr/>
          {showEditForm ? (
            <CommentEditForm 
            id={id}
            profile_id={profile_id}
            content={content}
            profileImage={profile_image}
            setComments={setComments}
            setShowEditForm={setShowEditForm}
            />) : (
              <p>{content}  </p>
            )}
        </div>
        {is_owner && !showEditForm && (
          <PostOptions 
          handleEdit={() => setShowEditForm(true)}
          handleDelete={handleDelete} />
        )}
    </div>
    </>
  )
}

export default Comment