import React from 'react';
import HomePage from '../styles/HomePage.module.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CurrentUserContext, useCurrentUser } from '../contexts/CurrentUserContext';


function HomeFeed() {
  const currentUser = useCurrentUser();
  const addPostIcon = (
    <Link
    className={HomePage.centerPost}
    to="/post/create/">
      <h5><i className="fa-solid fa-circle-plus"></i> Create Post</h5>
    </Link>
    )
  return (
    <div>
      <div className={HomePage.title}>
        <div>
          {/* Header of main feed to customize display */}
          <Container>
            <Row>
              <Col className={`${HomePage.centerPost}`}>
                {currentUser && addPostIcon}
              </Col>
              <Col>
              <p><i className="fa-solid fa-sort"></i> Sort By</p>
              <p><i className="fa-solid fa-filter"></i> Filter</p>
              </Col>
            </Row>
          </Container>
        </div>
        <p>text here</p>
        <Button onClick={console.log(currentUser)}> Click here for print profile</Button>
      </div>
    </div>
  )
}

export default HomeFeed