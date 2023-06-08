import React from 'react'
import styles from '../../styles/SideFilter.module.css';



function SideFilter() {
  return (
    <div className={styles.backgroundGreen}>
      <div className={styles.float}>
        <h4><u>Filter Options</u> <i className="fa-solid fa-filter"></i></h4>
        <sub>By Flower:</sub>
        
      </div>
    </div>
  )
}

export default SideFilter