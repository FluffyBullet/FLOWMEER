import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Container } from 'react-bootstrap';
import Asset from '../../components/Asset';
import HomeFeed from './HomeFeed';


const MostUsedFlowers = () => {
  const [flowerTag, setFlowerTag] = useState({
    pageProfile: { results: [] },
    mostUsed: { results: [] },
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { mostUsed } = flowerTag;
  const [hasLoaded, setHasLoaded] = useState(false);

  const Flowers_count = []

  // import a list of post and store under mostUsed variable.
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

  // Store a count of how many post with the relevant flower tag
  for (let i = 0; i < mostUsed.results.length; i++) {
    if (mostUsed.results[i].flower_tag === Flowers_count.flower_tag) {
      Flowers_count.count += 1;
    } else {
      Flowers_count.push({
        flower_tag: mostUsed.results[i].flower_tag,
        count: 1
      })
    }
  }
  console.log("flowers =" + Flowers_count)
  // console.log("flowers =" + JSON.stringify(Flowers_count))

  return (
    // to display a count of how many post on a flower family group.
    <Container >
      <h4><u>Popular Flowers:</u></h4>
      {hasLoaded ? (
        <>
          {Flowers_count.map((flowers) => {
            if (flowers.flower_tag !== "undefined") {
              return (
                <p>
                  {flowers.flower_tag.replace("_"," ").toUpperCase()} : {flowers.count} Post
                </p>
              );
            } else {
              return null;
            }
          })}
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