import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../components/SignUpForm.module.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUpForm() {
  return (
    <div>
        <div>
            <h2>Creating an account:</h2>
        </div>
        <div>
            {/* Form layout imported from react bootstrap - edit details. */}
            <Form>
                {/* Requesting to create unique username */}
                <Form.Group className={` mb-3`} controlId="username" name="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control className={`${styles.InputPlace}`} type="text" placeholder="<-x Username" />
                </Form.Group>
                <Row>
                    <Col>
                    {/* Asking for user name */}
                        <Form.Group className={`mb-3 ${styles.first_name}`} controlId="FirstName" name="first_name">
                            <Form.Label className="d-none">First Name</Form.Label>
                            <Form.Control type="text" className={`${styles.InputPlace}`} placeholder="First Name" />
                        </Form.Group>
                        <Form.Group className={`mb-3 ${styles.family_name}`} controlId="FamilyName" name="last_name">
                            <Form.Label className="d-none">Last Name</Form.Label>
                            <Form.Control type="text" className={`${styles.InputPlace}`} placeholder="Last Name" />
                        </Form.Group>
                    </Col>
                </Row>
                {/* Password section, original + authentication */}
                <Form.Group className="mb-3" controlId="password" name="password1">
                    <Form.Label className="d-none">Password Entry</Form.Label>
                    <Form.Control type="password" className={`${styles.InputPlace}`} placeholder="Create a password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ConfirmPassword" name="password2">
                    <Form.Label className="d-none">re-enter password</Form.Label>
                    <Form.Control type="password" className={`${styles.InputPlace}`} placeholder="Confirm your password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create account
                </Button>
            </Form>

        </div>
        
    </div>
    
  )
}

export default SignUpForm