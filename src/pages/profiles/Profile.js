import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';


const Profile = (props) => {

  const {profile, imageSize=55} = props;
  const {id, image, owner} = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username ===owner;

  return (
    <Container>
      <Link clasNAme="align-self-center" to={`/profiles/${id}`}>
        <Avatar src={image} height={imageSize}/>
      </Link>
      {profile.id}
      {profile.username}
    </Container>
  );
};

export default Profile;