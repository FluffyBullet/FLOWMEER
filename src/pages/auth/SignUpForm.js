import React from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
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
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control type="text" placeholder="<-x Username" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="first_name">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="family_name">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Create a password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        </Container>
        </div>
        
    </div>
    
  )
}

export default SignUpForm