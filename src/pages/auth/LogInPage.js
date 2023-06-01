import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import styles from "../../components/SignUpForm.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import pageAccessories from '../../components/pageAccessories.module.css';

const LogInForm = () => {
    
    const [LogInData, setLogInData] = useState({
        username:'',
        password:'',
    })
    const {username, password} = LogInData;
    const handleChange = (event) => {
        setLogInData ({
            ...LogInData,
            [event.target.name] : event.target.value
        });
    }

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("/dj-rest-auth/login/", LogInData);
          navigate("/");
        } catch (err) {
        }
      };

  return (
    <div>
        <div>
            <h2>Log In:</h2>
        </div>
        <div>
            {/* Form layout imported from react bootstrap - edit details. */}
            <Form onSubmit={handleSubmit}>
                {/* Requesting username to signin */}
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
                {/* Error section for incorrect username */}
                {errors.username?.map((message,idx) =>
                <Alert variant="danger" key={idx}>{message}</Alert>)}

                {/* Password section */}
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="d-none">Password Entry</Form.Label>
                    <Form.Control type="password" 
                    className={`${styles.InputPlace}`} 
                    placeholder="Enter your password" 
                    value={password}
                    name="password"
                    onChange={handleChange}
                    />
                </Form.Group>
                {/* Error section for incorrect password */}
                {errors.password?.map((message,idx) =>
                <Alert variant="danger" key={idx}>{message}</Alert>)}


                <Button className={pageAccessories.first_button} type="submit">
                    Log In
                </Button>
                {/* Error section for non-bound errors. */}
                {errors.non_field_errors?.map((message, idx) =>(
                    <Alert key={idx} variant="danger" className="mt-3">
                        {message}
                    </Alert>
                ))}
                
            </Form>
            <div className="mt-3">
                    <h4><u>Need an account ?</u></h4>
                    <p>Create one <Link to="/signin">here</Link></p>
            </div>

        </div>
        
    </div>
    
  )
}

export default LogInForm