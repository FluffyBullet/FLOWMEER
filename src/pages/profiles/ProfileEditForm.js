// Boiler template provided by CodeInstitute with moments walkthrough

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";


const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    fav_flower_family: "",
    profile_pic: "",
  });
  const { first_name, last_name, fav_flower_family, profile_pic } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {

      if (currentUser.pk.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, first_name, last_name, fav_flower_family, profile_pic } = data;
          setProfileData({ name, first_name, last_name, fav_flower_family, profile_pic });
        } catch (err) {
          console.log(err);
          navigate("/");
        }
      } else {
        navigate('/');
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("fav_flower_family", fav_flower_family);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_pic", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_pic: data.image,
      }));
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
    navigate(-1);
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>First Name:</Form.Label>
        <Form.Control 
        type="text"
        placeholder="First Name Here"
        value={first_name}
        onChange={handleChange}
        >

        </Form.Control>
        <Form.Label>Last Name:</Form.Label>
        <Form.Label>Favourite Flower Family:</Form.Label>
        <Form.Control as="select"
                        value={fav_flower_family}
                        name="fav_flower_family"
                        onChange={handleChange}>
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

      {errors?.fav_flower_family?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        onClick={() => navigate(-1)}
      >
        cancel
      </Button>
      <Button type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container>
            <Form.Group>
              {profile_pic && (
                <figure>
                  <Image src={profile_pic} fluid />
                </figure>
              )}
              {errors?.profile_pic?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className='btn my-auto'
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profile_pic: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;