import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";
import Image from 'react-bootstrap/Image';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import SideFilter from "../post/SideFilter";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: []})
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const setProfileData = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results; 
  const is_owner = currentUser?.username === profile?.owner 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{data: pageProfile}, {data : profilePosts}] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/post/?owner__profile=${id}`),
        ])
        setProfileData(prevState => ({
          ...prevState,
          pageProfile: {results: [pageProfile]}
        }))
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row className="d-flex justify-content-center">
        <Col>
          <Image roundedCircle
          src = {profile?.image}/>
        </Col>
        <Col >
          <h3 >{profile?.owner}</h3>
          <p>Favourite Flowers:{profile?.fav_flower_family}</p>
        </Col>
      </Row>
    </>
  );

  const mainProfilePost = (
    <>
      <hr />
      <h4>{profile?.owner}'s Post:</h4>
      {profilePosts.results.length ? (
        <InfiniteScroll 
        children={profilePosts.results.map((post) => (
          <Post key={post.id} {...post} setPosts={setProfilePosts} />
        ))}
        dataLength={profilePosts.results.length}
        loader={<Asset Spinner />}
        hasMore={!!profilePosts.next}
        next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset message={` ${profile?.owner} has not posted yet`}/>
      )}
      <hr />
    </>
  );

  return (
    <Row>
      <Col>
        <Container >
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePost}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col>
      </Col>
    </Row>
  );
}

export default ProfilePage;