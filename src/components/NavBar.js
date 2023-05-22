import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="bottom">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav"><img src={logo} alt="logo" height="75px"/></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center text-center md m-auto" id="nav-central">
                        <Nav.Link href="#home">
                            <i class="fa-brands fa-pagelines"></i>
                            <br/>
                            Home
                        </Nav.Link>
                        <Nav.Link href="#flower">
                            <i class="fa-solid fa-seedling"></i>
                            <br/>
                            Flower Profile
                        </Nav.Link>

                <Navbar.Brand>
                    <div className="nav-logo">
                        <img src={logo} alt="logo" height="200px" ></img>
                    </div>    
                </Navbar.Brand>

                        <Nav.Link href=""> 
                            <i class="fa-solid fa-fan"></i>
                            <br/>
                            LogIn
                        </Nav.Link>
                        <Nav.Link href=""> 
                            <i class="fa-solid fa-leaf"></i>
                            <br/>
                            LogOut
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
};

export default NavBar