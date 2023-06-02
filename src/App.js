import styles from './styles/App.module.css';
import NavBar from "./components/NavBar";
import Header from './components/Header';
import SignUpForm from './pages/auth/SignUpForm';
import LogInPage from './pages/auth/LogInPage';
import HomeFeed from './pages/HomeFeed';
import Container from 'react-bootstrap/Container';
import {Route,Routes, Outlet} from 'react-router-dom';
import './api/axiosDefaults'




function App() {

  
  return (

    <div className={styles.App}>
      <Header/>
      <NavBar/>

      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<HomeFeed/> }/>
          <Route exact path="/flower" element={<h1>Flower Profile</h1> }/>
          <Route exact path="/signin" element={<LogInPage/>}/>
          <Route exact path="/signup" element={<SignUpForm/>}/>
          <Route path="*" element={<p>Sorry, this page is not found</p>}/>
        </Routes>
      </Container>

      <Outlet />
    </div>

  );
}

export default App;
