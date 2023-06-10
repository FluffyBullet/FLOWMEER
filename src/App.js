import styles from './styles/App.module.css';
import NavBar from "./components/NavBar";
import Header from './components/Header';
import SignUpForm from './pages/auth/SignUpForm';
import LogInPage from './pages/auth/LogInPage';
import PostCreateForm from "./pages/post/PostCreateForm";
import HomeFeed from './pages/post/HomeFeed';
import Container from 'react-bootstrap/Container';
import {Route,Routes, Outlet} from 'react-router-dom';
import PostPage from './pages/post/PostPage';
import './api/axiosDefaults';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from "./pages/post/PostEditForm"
import UserProfile from './pages/profiles/UserProfile';



function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.pk || "";
  return (
    <div className={styles.App}>
      <Header/>
      <NavBar/>

      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<HomeFeed message="I'm unable to find any post matching your search filters. Please amend your options"/> }/>
          <Route exact path="/feed" element={
          <HomeFeed message="I can only find a tumbleweed. Try following others or searching more to get results" 
          filter={'owner__followed__owner__profile=${profile_id}&'}/> }/>
          <Route exact path="/voted" element={<HomeFeed message="Does not look like you've had your say yet. Get out there and do some voting!"/> }/>
          <Route exact path="/flower" element={<h1>Flower Profile</h1> }/>
          <Route exact path="/signin" element={<LogInPage/>}/>
          <Route exact path="/signup" element={<SignUpForm/>}/>
          <Route exact path="/post/create" element={<PostCreateForm/>}/>
          <Route exact path="/post/:id" element={<PostPage/>}/>
          <Route exact path="/post/:id/edit" element={<PostEditForm/>}/>
          <Route exact path="/profile/:id" element={<UserProfile/>}/>
          <Route path="*" element={<p>Sorry, this page is not found</p>}/>
        </Routes>
      </Container>

      <Outlet />
    </div>

  );
}

export default App;
