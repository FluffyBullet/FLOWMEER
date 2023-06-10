import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Container } from 'react-bootstrap';
import Asset from '../../components/Asset';

const MostUsedFlowers = () => {
  const [flowerTag, setFlowerTag] = useState({
    pageProfile: { results: [] },
    mostUsed: { results: [] },
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { mostUsed } = flowerTag;
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get('/post/');
        setFlowerTag(prevState => ({
          ...prevState,
          mostUsed: data,
        }));
        setIsDataFetched(true);
        setHasLoaded(true);
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
      <h4><u>Popular Flowers:</u></h4>
      {hasLoaded ? (
        <>
        {mostUsed.results.map(post => (
            <p key={post.id}>{post.flower_tag}</p>
          ))
      }
      </>
      ) : (
        <Container>
          <Asset Spinner />
        </Container>
      )}
    </Container>
  );
};

export default MostUsedFlowers