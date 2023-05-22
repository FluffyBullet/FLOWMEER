import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="bottom">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav"><img src={logo} alt="logo" height="75px"/></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center text-center md m-auto" id="nav-central">
                        <NavLink to="/" className={styles.NavLink} activeClassName={styles.Active} exact>
                            <div>
                            <i class="fa-brands fa-pagelines"></i>
                            <br/>
                            Home
                            </div>
                        </NavLink>
                        <NavLink to="/flower" className={styles.NavLink} activeClassName={styles.Active}>
                            <div>
                            <i class="fa-solid fa-seedling"></i>
                            <br/>
                            Flower Profile
                            </div>
                        </NavLink>
                    <Navbar.Brand>
                        <div className="nav-logo">
                            <img src={logo} alt="logo" height="200px" ></img>
                        </div>    
                    </Navbar.Brand>
                        <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}> 
                            <div>
                            <i class="fa-solid fa-fan"></i>
                            <br/>
                            LogIn
                            </div>
                        </NavLink>
                        <NavLink to="/logout" className={styles.NavLink} activeClassName={styles.Active}> 
                            <div>
                            <i class="fa-solid fa-leaf"></i>
                            <br/>
                            LogOut
                            </div>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
};

export default NavBar