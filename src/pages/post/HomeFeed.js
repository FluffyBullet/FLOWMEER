import React, { useEffect, useState } from 'react';
import HomePage from '../../styles/HomePage.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';
import Asset from '../../components/Asset';
import NoResults from "../../assets/empty.jpg";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';



function HomeFeed({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/post/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  const addPostIcon = (
    <Link
      className={HomePage.centerPost}
      to="/post/create/">
      <h5><i className="fa-solid fa-circle-plus"></i> Create Post</h5>
    </Link>
  )


  return (
    <div>
      <div >
        <div className={HomePage.title}>
          {/* Header of main feed to customize display */}
          <Container>
            <Row>
              <Col className={HomePage.centerPost}>
                {currentUser && addPostIcon}
              </Col>
              <Col>
                <p><i className="fa-solid fa-sort"></i> Sort By</p>
                <p><i className="fa-solid fa-filter"></i> Filter</p>
              </Col>
            </Row>
          </Container>
        </div>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container>
                <Asset src={NoResults} height={55} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container >
            <Asset Spinner />
          </Container>
        )}
      </div>
    </div>
  )
}

export default HomeFeed