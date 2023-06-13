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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get('/post/');
        setFlowerTag({
          ...flowerTag,
          mostUsed: data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (flowerTag.mostUsed.results.length === 0) {
      fetchData();
    }
  }, [flowerTag]);

  const renderFlowers = () => {
    const flowersCount = {};

    for (let i = 0; i < flowerTag.mostUsed.results.length; i++) {
      const flowerTagValue = flowerTag.mostUsed.results[i].flower_tag;
      if (flowersCount.hasOwnProperty(flowerTagValue)) {
        flowersCount[flowerTagValue] += 1;
      } else {
        flowersCount[flowerTagValue] = 1;
      }
    }

    return Object.keys(flowersCount).map(flowerTag => (
      <div key={flowerTag}>
        <span>{flowerTag}: </span>
        <span>{flowersCount[flowerTag]}</span>
      </div>
    ));
  };

  return (
    <div>
      <h5>Most Used:</h5>
      {renderFlowers()}
    </div>
  );
};

export default MostUsedFlowers;
