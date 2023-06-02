import React from "react";
import styles from "../styles/Asset.module.css";
import Spinner from 'react-bootstrap/Spinner';

const Asset = ({spinner, src, message}) => {
    return (
        <div className={`${styles.Asset} p-4`}>
            {spinner && <spinner animation="grow" variant="success" />}
            {src && <img src={src} alt={message}/>}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
    };

export default Asset;