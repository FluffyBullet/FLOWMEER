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
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Multiselect from "multiselect-react-dropdown";

function PostCreateForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        flower_tag: [],
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

    const flowerSelection = []
    function flowerInput() {
        console.log(flowerSelection)

    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData()

        

        formData.append('title', title);
        formData.append('flower_tag', flower_tag);
        formData.append('image', imageInput.current.files[0]);


        try {
            const { data } = await axiosReq.post('/post/', formData);
            navigate('post/')
        } catch (err) {
            console.log(JSON.stringify(postData))
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    const flower_families = [
        { name: 'flower_tag', desc: 'Peruvian Lily', id: 'peruvian_lily' },
        { name: 'flower_tag', desc: 'Colchicum', id: 'colchicum' },
        { name: 'flower_tag', desc: 'Lily', id: 'lily' },
        { name: 'flower_tag', desc: 'Orchid', id: 'orchid' },
        { name: 'flower_tag', desc: 'Iris', id: 'iris' },
        { name: 'flower_tag', desc: 'Asphodel', id: 'asphodel' },
        { name: 'flower_tag', desc: 'Daffodil', id: 'daffodil' },
        { name: 'flower_tag', desc: 'Asparagus', id: 'asparagus' },
        { name: 'flower_tag', desc: 'Poppy', id: 'poppy' },
        { name: 'flower_tag', desc: 'Buttercup', id: 'buttercup' },
        { name: 'flower_tag', desc: 'Saxifrage', id: 'saxifrage' },
        { name: 'flower_tag', desc: 'Stonecrop', id: 'stonecrop' },
        { name: 'flower_tag', desc: 'Pea', id: 'pea' },
        { name: 'flower_tag', desc: 'Rose', id: 'rose' },
        { name: 'flower_tag', desc: 'Spurge', id: 'spurge' },
        { name: 'flower_tag', desc: 'Violet', id: 'violet' },
        { name: 'flower_tag', desc: 'St Johns Wort', id: 'st_johns_wort' },
        { name: 'flower_tag', desc: 'Geranium', id: 'geranium' },
        { name: 'flower_tag', desc: 'Loosestrife', id: 'loosestrife' },
        { name: 'flower_tag', desc: 'Willow-herb', id: 'willow-herb' },
        { name: 'flower_tag', desc: 'Mallow', id: 'mallow' },
        { name: 'flower_tag', desc: 'Rock Rose', id: 'rock_rose' },
        { name: 'flower_tag', desc: 'Cabbage', id: 'cabbage' },
        { name: 'flower_tag', desc: 'Sea Lavender', id: 'sea_lavender' },
        { name: 'flower_tag', desc: 'Pink', id: 'pink' },
        { name: 'flower_tag', desc: 'Phlox', id: 'phlox' },
        { name: 'flower_tag', desc: 'Primrose', id: 'primrose' },
        { name: 'flower_tag', desc: 'Heath', id: 'heath' },
        { name: 'flower_tag', desc: 'Periwinkle', id: 'periwinkle' },
        { name: 'flower_tag', desc: 'Borage', id: 'borage' },
        { name: 'flower_tag', desc: 'Convolvulus', id: 'convolvulus' },
        { name: 'flower_tag', desc: 'Nightshade', id: 'nightshade' },
        { name: 'flower_tag', desc: 'Olive', id: 'olive' },
        { name: 'flower_tag', desc: 'Plantain', id: 'plantain' },
        { name: 'flower_tag', desc: 'Figwort', id: 'figwort' },
        { name: 'flower_tag', desc: 'Mint', id: 'mint' },
        { name: 'flower_tag', desc: 'Acanthus', id: 'acanthus' },
        { name: 'flower_tag', desc: 'Verbena', id: 'verbena' },
        { name: 'flower_tag', desc: 'Bellflower', id: 'bellflower' },
        { name: 'flower_tag', desc: 'Daisy', id: 'daisy' },
        { name: 'flower_tag', desc: 'Umbellifer', id: 'umbellifer' },
        { name: 'flower_tag', desc: 'Honeysuckle', id: 'honeysuckle' },

    ]
    let flower = document.getElementById('flowerTags')

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
            <Form.Group>
                {/* Intended as flower tag, but amended to description for temporary. */}
                <Form.Label> Includes families of : </Form.Label>
                <Multiselect
                    options={flower_families}
                    displayValue="desc"
                    optionValue="id"
                    name="flowerSelection"
                    onSelect = {(event) => {
                        for (let resp in event){
                            if (resp.id in flowerSelection) {
                                console.log("not added")
                            } else {
                                console.log(event[resp].id)
                                flowerSelection.push(event[resp].id)
                                flowerInput();
                            }
                        }
                    }}
                    closeOnSelect={true}
                    selectedValues={flowerSelection.push()}
                />
                <Form.Label className="d-none">Title</Form.Label>
                <Form.Control
                    type="text"
                    name="flower_tag"
                    value={flower_tag}
                    onChange={handleChange}
                />
            </Form.Group>
            <Button className={pageAccessories.first_button} type="submit">
                create
            </Button>
            <Button
                className={pageAccessories.first_button}
                onClick={() => { }}
            >
                cancel
            </Button>
        </div>
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