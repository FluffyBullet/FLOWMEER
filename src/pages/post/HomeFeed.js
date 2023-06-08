import React, { useEffect, useState } from 'react';
import HomePage from '../../styles/HomePage.module.css';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';
import Post from './Post';
import Asset from '../../components/Asset';
import NoResults from "../../assets/empty.jpg";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
import SideFilter from './SideFilter';



function HomeFeed({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/post/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
        console.log(`Search parameter = /post/?${filter}search=${query}`)
        console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  }, [filter, query, pathname]);

  const addPostIcon = (
    <Link
      className={HomePage.centerPost}
      to="/post/create/">
      <h5><i className="fa-solid fa-circle-plus"></i> Create Post</h5>
    </Link>
  )

  return (
    <div>
      <Row>
        <Col className={HomePage.mobileHide}>
        </Col>
        <Col>
          <div >
            <div className={HomePage.title}>
              {/* Header of main feed to customize display */}
              <Container>
                <Row>
                  <Col className={HomePage.centerPost}>
                    {currentUser && addPostIcon}
                  </Col>
                  <Col>
                    <Form
                      onSubmit={(event) => event.preventDefault()}>
                      <Form.Group className={HomePage.SearchFor}>
                        <Form.Label className="d-none"> Serach Bar</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                        >
                        </Form.Control>
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Form.Group>
                    </Form>
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
                    <Asset src={NoResults} height={20} message={message} />
                  </Container>
                )}
              </>
            ) : (
              <Container >
                <Asset Spinner />
              </Container>
            )}
          </div>
        </Col>
        <Col className={HomePage.mobileHide}>
        <div>
          <SideFilter/>
        </div>
        </Col>

      </Row>

    </div>
  )
}

export default HomeFeed