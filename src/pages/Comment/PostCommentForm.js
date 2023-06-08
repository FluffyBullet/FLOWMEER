// Complete code provided by Code Institute via walkthrough on moments.

import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function PostCommentForm(props) {
  const { post, setPost, setComments, } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
      ;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div class={styles.CommentBody}>
        <div className={styles.CommentTextForm}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                className={styles.CommentForm}
                placeholder="my comment..."
                as="textarea"
                value={content}
                onChange={handleChange}
                rows={1}
              />
            </InputGroup>
          </Form.Group>
          <div className={styles.CommentSubmit}>
            <button
              className={`${styles.Button} btn d-block ml-auto`}
              disabled={!content.trim()}
              type="submit"
            >
              post
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default PostCommentForm;