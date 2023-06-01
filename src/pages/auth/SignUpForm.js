import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../../components/SignUpForm.module.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Alert } from 'bootstrap';

function SignUpForm() {

    const handleChange = () => (event) => {
        setSignUpData ({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    }

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await axios.post('dj-rest-auth/registration/', signUpData)
            navigate.push('signin');
        } catch(err) {
            setErrors(err.response?.data)
        }
    }


    const [signUpData, setSignUpData] = useState({
        username:'',
        first_name:'',
        family_name:'',
        password1:'',
        password2:''
    })
    const {username, first_name, family_name, password1, password2} = signUpData;


  return (
    <div>
        <div>
            <h2>Creating an account:</h2>
        </div>
        <div>
            {/* Form layout imported from react bootstrap - edit details. */}
            <Form onSubmit={handleSubmit}>
                {/* Requesting to create unique username */}
                <Form.Group className={`mb-3`} controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control className={`${styles.InputPlace}`} 
                    type="text" 
                    value={username}
                    placeholder="<-x Username" 
                    name="username"
                    onChange={handleChange('username')}
                    />
                </Form.Group>
                {errors.username?.map((message,idx) =>
                <Alert variant="warning" key={idx}>{message}</Alert>)}

                <Row>
                    <Col>
                    {/* Asking for users name */}
                        <Form.Group className={`mb-3 ${styles.first_name}`} controlId="FirstName" >
                            <Form.Label className="d-none">First Name</Form.Label>
                            <Form.Control type="text" 
                            className={`${styles.InputPlace}`} 
                            placeholder="First Name"
                            value={first_name}
                            name="first_name"
                            onChange={handleChange('first_name')} />
                        </Form.Group>
                        {errors.username?.map((message,idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>)}

                        <Form.Group className={`mb-3 ${styles.family_name}`} controlId="FamilyName" >
                            <Form.Label className="d-none">Last Name</Form.Label>
                            <Form.Control type="text" 
                            className={`${styles.InputPlace}`} 
                            placeholder="Last Name" 
                            value={family_name}
                            name="family_name"
                            onChange={handleChange('family_name')}/>
                        </Form.Group>
                        {errors.username?.map((message,idx) =>
                        <Alert variant="warning" key={idx}>{message}</Alert>)}
                    </Col>
                </Row>
                {/* Password section, original + authentication */}
                <Form.Group className="mb-3" controlId="password" >
                    <Form.Label className="d-none">Password Entry</Form.Label>
                    <Form.Control type="password" 
                    className={`${styles.InputPlace}`} 
                    placeholder="Create a password" 
                    value={password1}
                    name="password1"
                    onChange={handleChange('password1')}
                    />
                </Form.Group>
                {errors.username?.map((message,idx) =>
                <Alert variant="warning" key={idx}>{message}</Alert>)}

                <Form.Group className="mb-3" controlId="ConfirmPassword" name="password2">
                    <Form.Label className="d-none">re-enter password</Form.Label>
                    <Form.Control type="password" 
                    className={`${styles.InputPlace}`} 
                    placeholder="Confirm your password"
                    value={password2} 
                    name='password2'
                    onChange={handleChange('password2')}/>
                </Form.Group>
                {errors.username?.map((message,idx) =>
                <Alert variant="warning" key={idx}>{message}</Alert>)}

                <Button variant="primary" type="submit">
                    Create account
                </Button>
            </Form>

        </div>
        
    </div>
    
  )
}

export default SignUpForm