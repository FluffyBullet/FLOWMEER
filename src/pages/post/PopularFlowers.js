import React, { useEffect, useState } from 'react'
import styles from '../../styles/PopularFlowers.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';


function PopularFlowers() {

  const [mostFlowerPost, setMostFlowerPost] = useState({

    flowerTags: { results: [] },

  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq('/post/?filter=flower_tag')
        console.log(data.flower_tag)
      } catch(err) {
    console.log(err)}
  }
  handleMount()
})

  ;

  return (
    <div className={styles.backgroundGrey}>
      <h4><u>Popular Flowers</u></h4>
      {mostFlowerPost.flower_tag}
    </div>
  )
}

export default PopularFlowers