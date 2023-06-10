import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Post from "./Post";
import PostCommentForm from "../comments/PostCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Col, Container, Row } from "react-bootstrap";
import Comment from '../comments/Comment'


function PostPage() {
  
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: []});
  const {id} = useParams();
  const[post, setPost] = useState({results: []});
  
  useEffect(()=> {
        const handleMount = async () => {
            try {
                const [{data: post},{data: comments}] = await Promise.all([
                    axiosReq.get(`/post/${id}`),
                    axiosReq.get(`/comments/?post=${id}`)
                ]);
                setPost({ results: [post]});
                setComments(comments)
            } catch(err) {
                console.log(err)
            }
        }

        handleMount()
    }, [id])
    return (
        <>
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            
            <Post {...post.results[0]} setPosts={setPost} postPage />
            <Container>
              {currentUser ? (
                <PostCommentForm
                  profile_id={currentUser.profile_id}
                  profileImage={profile_image}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                "Comments"
              ) : null}
              {comments.results.length ? (
                comments.results.map(comment=> (
                  <Comment key={comment.id} {...comment}
                  setPost={setPost}
                  setComment={setComments}
                  />
                ))
              ): currentUser ? (
                <span> No comments yet</span>
              ): (
                <span>No Comments Yet</span>
              )}
            </Container>
          </Col>
        </Row>
        </>);
}

export default PostPage