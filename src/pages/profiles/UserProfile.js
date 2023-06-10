import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Container, Row } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { popularProfiles } = profileData;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get('/profiles/');
        setProfileData(prevState => ({
          ...prevState,
          popularProfiles: data,
        }));
        setIsDataFetched(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (!isDataFetched) {
      handleMount();
    }
  }, [isDataFetched]);

  return (
    <Container>
      <p>Most Followed</p>
      {popularProfiles.results.length ? (
        <>
      {popularProfiles.results.map(profile => (
        <p key={profile.id}>{profile.owner}</p>
      ))}
      </>
      ) : (
        <Asset Spinner />
      )}
    </Container>
  );
};

export default UserProfile;