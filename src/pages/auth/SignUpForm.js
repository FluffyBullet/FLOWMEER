import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";

import styles from "../../components/SignUpForm.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import pageAccessories from '../../components/pageAccessories.module.css';

const SignUpForm = () => {
    
    
    const [signUpData, setSignUpData] = useState({
        username:'',
        password1:'',
        password2:'',
    })
    const {username, password1, password2} = signUpData;
    const handleChange = (event) => {
        setSignUpData ({
            ...signUpData,
            [event.target.name] : event.target.value
        });
    }
    console.log(signUpData)

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("/dj-rest-auth/registration/", signUpData);
          navigate("/signin");
        } catch (err) {
          setErrors(err.response?.data);
        }
      };

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
                    name="username"
                    value={username}
                    placeholder="<-x Username" 
                    onChange={handleChange}
                    />
                </Form.Group>
                {errors.username?.map((message,idx) =>
                <Alert variant="danger" key={idx}>{message}</Alert>)}

                {/* Password section, original + authentication */}
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="d-none">Password Entry</Form.Label>
                    <Form.Control type="password" 
                    className={`${styles.InputPlace}`} 
                    placeholder="Create a password" 
                    value={password1}
                    name="password1"
                    onChange={handleChange}
                    />
                </Form.Group>
                {errors.password1?.map((message,idx) =>
                <Alert variant="danger" key={idx}>{message}</Alert>)}

                <Form.Group className="mb-3" controlId="ConfirmPassword">
                    <Form.Label className="d-none">re-enter password</Form.Label>
                    <Form.Control type="password" 
                    className={`${styles.InputPlace}`} 
                    placeholder="Confirm your password"
                    value={password2} 
                    name='password2'
                    onChange={handleChange}/>
                </Form.Group>
                {errors.password2?.map((message,idx) =>
                <Alert variant="danger" key={idx}>{message}</Alert>)}

                <Button className={pageAccessories.first_button} type="submit">
                    Create account
                </Button>
                {errors.non_field_errors?.map((message, idx) =>(
                    <Alert key={idx} variant="danger" className="mt-3">
                        {message}
                    </Alert>
                ))}
            </Form>
            <div className="mt-3">
                    <h4><u>Already have an account ?</u></h4>
                    <p>Log in <Link to="/signin">Here</Link></p>
            </div>

        </div>
        
    </div>
    
  )
}

export default SignUpForm