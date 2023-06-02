import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import {NavLink} from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser,
  } from "../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import axios from 'axios';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const handleSignOut = async() => {
        try {
            await axios.post('dj-rest-auth/logout/');
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    }
    const loggedInIcons = <>
        <Link
        to={'/profiles/${currentUser.profile_id}'}
        >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40}/>
        </Link>
        <Link
        to={'/'}
        onClick={handleSignOut}>
        <i className="fa-solid fa-clover"></i> Sign Out
        </Link>

        </>
        

    const loggedOutIcons =(
        <> 
            <NavLink to="/signin" className={styles.NavLink} > 
                <div>
                <i className="fa-solid fa-fan"></i>
                <br/>
                LogIn
                </div>
            </NavLink>
            <NavLink to="/signup" className={styles.NavLink} > 
                <div>
                <i className="fa-solid fa-leaf"></i>
                <br/>
                Sign Up
                </div>
            </NavLink>
        </>);
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="bottom">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav"><img src={logo} alt="logo" height="75px"/>
                <sup>Menu <i className="fa-solid fa-caret-down"></i></sup>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center text-center md m-auto" id="nav-central">
                        <NavLink to="/" className={styles.NavLink} exact="true">
                            <div>
                            <i className="fa-brands fa-pagelines"></i>
                            <br/>
                            Home
                            </div>
                        </NavLink>
                        <NavLink to="/flower" className={styles.NavLink}>
                            <div>
                            <i className="fa-solid fa-seedling"></i>
                            <br/>
                            Flower Profile
                            </div>
                        </NavLink>
                    <Navbar.Brand>
                        <div className="nav-logo">
                            <img src={logo} alt="logo" height="200px" ></img>
                        </div>    
                    </Navbar.Brand>
                        {currentUser ? loggedOutIcons: loggedInIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
};

export default NavBar