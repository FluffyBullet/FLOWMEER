import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.gif";
import appStyles from "../../styles/PostCreateEdit.module.css";
import styles from "../../styles/PostCreateEdit.module.css";
import pageAccessories from "../../styles/pageAccessories.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostCreateForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        flower_tag: '',
        image: "",
    });
    const { title, flower_tag, image } = postData;

    const imageInput = useRef(null)
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData()
        formData.append('title', title);
        formData.append('flower_tag', flower_tag);
        formData.append('image', imageInput.current.files[0]);
        console.log(useCurrentUser)

        try {
            const { data } = await axiosReq.post('/post/', formData);
            navigate(`post/${data.id}`)
        } catch (err) {
            console.log(JSON.stringify(postData))
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }


    const textFields = (
        <div className="text-center">
            {/* Request users to create a title for their post */}
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}

                />
            </Form.Group>
            {errors.title?.map((message, idx) =>
                <Alert variant="danger" key={idx}>
                    {message}
                </Alert>)}
            <Form.Group>
                {/* Intended as flower tag, but amended to description for temporary. */}
                <Form.Label> Includes families of : </Form.Label>

                        <Form.Control as="select">
                    <option className="d-none" value="">
                         Select Option
                    </option>
                    <option>Select flower Family</option>
                    <option value="peruvian_lily">Peruvian Lily</option>
                    <option value="colchicum">Colchicum</option>
                    <option value="lily">Lily</option>
                    <option value="orchid">Orchid</option>
                    <option value="iris">Iris</option>
                    <option value="asphodel">Asphodel</option>
                    <option value="daffodil">Daffodil</option>
                    <option value="asparagus">Asparagus</option>
                    <option value="poppy">Poppy</option>
                    <option value="buttercup">Buttercup</option>
                    <option value="saxifrage">Saxifrage</option>
                    <option value="stonecrop">Stonecrop</option>
                    <option value="pea">Pea</option>
                    <option value="rose">Rose</option>
                    <option value="spurge">Spurge</option>
                    <option value="violet">Violet</option>
                    <option value="st_johns_wort">St Johns Wort</option>
                    <option value="geranium">Geranium</option>
                    <option value="loosestrife">Loosestrife</option>
                    <option value="willow-herb">Willow-herb</option>
                    <option value="mallow">Mallow</option>
                    <option value="rock_rose">Rock Rose</option>
                    <option value="cabbage">Cabbage</option>
                    <option value="sea_lavender">Sea Lavender</option>
                    <option value="pink">Pink</option>
                    <option value="phlox">Phlox</option>
                    <option value="primrose">Primrose</option>
                    <option value="heath">Heath</option>
                    <option value="periwinkle">Periwinkle</option>
                    <option value="borage">Borage</option>
                    <option value="convolvulus">Convolvulus</option>
                    <option value="nightshade">Nightshade</option>
                    <option value="olive">Olive</option>
                    <option value="plantain">Plantain</option>
                    <option value="figwort">Figwort</option>
                    <option value="mint">Mint</option>
                    <option value="acanthus">Acanthus</option>
                    <option value="verbena">Verbena</option>
                    <option value="bellflower">Bellflower</option>
                    <option value="daisy">Daisy</option>
                    <option value="umbellifer">Umbellifer</option>
                    <option value="honeysuckle">Honeysuckle</option>
                </Form.Control>
            </Form.Group>
            {errors.flower_tag?.map((message, idx) =>
                <Alert variange="danger" key={idx}>
                    {message}
                </Alert>)}

            <Button className={pageAccessories.first_button} type="submit">
                create
            </Button>
            <Button
                className={pageAccessories.first_button}
                onClick={() => { navigate(-1) }}
            >
                cancel
            </Button>
        </div >
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col >
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={pageAccessories.first_button}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center "
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}

                            <Form.File
                                className={"d-none"}
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.Image?.map((message, idx) =>
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>)}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}
export default PostCreateForm;