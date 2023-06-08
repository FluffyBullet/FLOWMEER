import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Post from "./Post";
import PostCommentForm from "../Comment/PostCommentForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Col, Container, Row } from "react-bootstrap";


function PostPage() {
  
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: []});
  const {id} = useParams();
  const[post, setPost] = useState({results: []});
  
  useEffect(()=> {
        const handleMount = async () => {
            try {
                const [{data: post}] = await Promise.all([
                    axiosReq.get(`/post/${id}`),
                ]);
                setPost({ results: [post]})
                console.log(post)
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
            </Container>
          </Col>
        </Row>
        </>);
}

export default PostPage