import React, { useEffect, useState } from 'react'
import styles from '../../styles/SideFilter.module.css';
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import Profile from '../profiles/UserProfile';

const SideFilter = () => {
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
  <div className={styles.backgroundGreen}>
    <div className={styles.float}>
      <h4><u>Posters Profiles:</u></h4>
      <Container>
        {popularProfiles.results.map(profile => (
          <Profile key={profile.id} profile={profile}/>
        ))}
      </Container>
    </div>
  </div>
)
        }
export default SideFilter
