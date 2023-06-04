import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Col, Media, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        flower_tag,
        votes_count,
        votes_id,
        title,
        image,
        updated_at,
        postPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    return <>
        {/* Create a card for each post */}
        <Card className={styles.MainCard}>
            <Card.Body className="align-items-center"Style="padding: 0 11px">
                <Media className="align-items-center justify-content-between " >
                    {/* Image to be shown at the top of the card */}
                    <Link to={'/post/${id}'}>
                        <Card.Img className={styles.PostImage} src={image} alt={title} />
                    </Link>
                    <Row>
                        {/* Row of information, Title, who by, when it was posted and what family is being featured */}
                        <Col className={styles.SubTitles}>
                            <div>{title} by <Link to={`/profiles/${profile_id}`}>{owner}</Link></div>
                        </Col>
                        <Col>
                            {flower_tag && <span className={styles.SubTitles}>Featuring:</span>}
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.SubTitles}>
                            <div>
                                <span> on </span>
                                <span>{updated_at}</span>
                            </div>
                        </Col>
                        <Col className={styles.SubTitles} className="text-align-right">
                            {flower_tag}
                        </Col>
                    </Row>
                    <Row className={styles.Reactions}>
                    <Col>
                        <div>
                            {/* Row of variables to the post, how many votes, comment page and edit/delete section */}
                        {is_owner ? (
                        <OverlayTrigger placement="top" overlap={<Tooltip>You cannot vote for yourself</Tooltip>}>
                            <>
                            <i className="fa-solid fa-check-to-slot"></i>
                            <span>{votes_count} votes</span>
                            </>
                        </OverlayTrigger>
                    ) : votes_id ? (
                        <span onClick={() => { }}>
                            Already voted</span>
                    ) : currentUser ? (
                        <span onClick={() => { }}>
                            <p>to show as not voted</p>
                        </span>
                    ) : (
                        <OverlayTrigger placement="top" overlap={<Tooltip>Log in to vote for this image</Tooltip>}>
                            <i className="fa-solid fa-check-to-slot"></i>
                        </OverlayTrigger>
                    )}
                    </div>
                    </Col>
                    <Col>
                        <div>
                            <Link to={`/post/${id}`}>
                            Comment Section
                            {comments_count}
                            </Link>
                        </div>
                    </Col>
                    <Col>
                    {is_owner && postPage && "..."}
                    </Col>
                    </Row>
                </Media>
            </Card.Body>
        </Card>
    </>
}

export default Post