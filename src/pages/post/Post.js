import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Col, Media, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { PostOptions } from '../../components/PostOptions';
import Profile from '../profiles/UserProfile';

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_pic,
        comments_count,
        flower_tag,
        votes_count,
        votes_id,
        title,
        image,
        updated_at,
        postPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/post/${id}/edit`);
    };
    console.log("props = " + profile_pic)

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/post/${id}`);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };


    const handleVote = async () => {
        try {
            const { data } = await axiosRes.post('/votes/', { post: id });
            setPosts((prevPost) => ({
                ...prevPost,
                results: prevPost.results.map((post) => {
                    return post.id === id ?
                        { ...post, votes_count: post.votes_count + 1, votes_id: data.id }
                        : post;
                })
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeVote = async () => {
        console.log(votes_id)
        try {
            await axiosRes.delete(`/votes/${votes_id}`);
            setPosts((prevPost) => ({
                ...prevPost,
                results: prevPost.results.map((post) =>
                post.id === id ? { ...post, votes_count: post.votes_count - 1, votes_id: null } : post
                ),
            }));
        } catch (err) {
            console.log(err);
        }
    };


    return <>
        {/* Create a card for each post */}
        <Card className={styles.MainCard}>
            <Card.Body className="align-items-center" style={{ padding: "0 11px" }}>
                <Media className="align-items-center justify-content-between " >

                    {/* Image to be shown at the top of the card */}
                    <Link to={`/post/${id}`}>
                        <Card.Img className={styles.PostImage} src={image} alt={title} />
                    </Link>
                    <Row>
                        {/* Row of information, Title, who by, when it was posted and what family is being featured */}
                        <Col className={styles.SubTitles}>
                            <div><strong>{title}</strong> by
                                <Link to={`/profiles/${profile_id}`}>
                                    {owner}
                                </Link>
                            </div>

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
                        <Col className="`${styles.SubTitles}` text-align-right">
                            {flower_tag}
                        </Col>
                    </Row>
                    <Row className={styles.Reactions}>
                        <Col>
                            <div>
                                {/* Row of variables to the post, how many votes, comment page and edit/delete section */}
                                {is_owner ? (
                                    <>
                                    <OverlayTrigger
                                    overlay ={<Tooltip ><p>You cannot vote on your own post</p></Tooltip>}
                                    >
                                        <span>{votes_count} votes</span>
                                        </OverlayTrigger>
                                    </>
                                ) : votes_id ? (
                                    <span onClick={handleDeVote}>
                                        <i className="fa-solid fa-check-to-slot" style={{ color: "#d10000", }}></i>
                                        <p>Voted</p> <br/>
                                        <span>{votes_count} votes</span>
                                    </span>
                                ) : currentUser ? (
                                    <>
                                    <span onClick={handleVote}>
                                        <i className="fa-solid fa-check-to-slot" style={{ color: "#f7f7f7", }}></i>
                                        <p>Not Voted</p><br/>
                                        <span>{votes_count} votes</span>
                                    </span>
                                    </>
                                ) : (
                                    <>
                                        <OverlayTrigger
                                    overlay ={<Tooltip ><p>Please log in to vote</p></Tooltip>}
                                    >
                                        <div>
                                        <i className="fa-solid fa-check-to-slot" style={{ color: "#f7f7f7", }}></i>
                                        <span>{votes_count} votes</span>
                                        </div>
                                        </OverlayTrigger>
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Link to={`/post/${id}`}>
                                    {comments_count}
                                    Comments
                                </Link>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex align-items-center">
                                {is_owner && postPage && (
                                    <PostOptions handleEdit={handleEdit} handleDelete={handleDelete} />
                                )}
                            </div>
                        </Col>
                    </Row>
                </Media>
            </Card.Body>
        </Card>
    </>
}

export default Post