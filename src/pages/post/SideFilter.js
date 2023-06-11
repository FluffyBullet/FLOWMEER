import React, { useEffect, useState } from 'react'
import styles from '../../styles/SideFilter.module.css';
import { Container } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

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
      <h4><u>Filter Options</u> <i className="fa-solid fa-filter"></i></h4>
      <sub><u>By Flower:</u></sub>
      <Container>
        <sup><u>By Poster</u></sup>
        {popularProfiles.results.map(profile => (
          <p key={profile.id}>{profile.owner}</p>
        ))}
      </Container>
    </div>
  </div>
)
        }
export default SideFilter
