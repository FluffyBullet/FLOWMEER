import styles from './components/App.module.css';
import NavBar from "./components/NavBar";
import Header from './components/Header';
import Container from 'react-bootstrap/container';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className={styles.App}>
      <Header/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=> <h1>Home</h1> }/>
          <Route exact path="/flower" render={()=> <h1>Flower Profile</h1> }/>
          {/* <Route exact path="/users/" render={()=> <h1>User Profile</h1> }/> */}
          <Route exact path="/signin" render={()=> <h1>Sign In</h1> }/>
          <Route render={() => <p>Sorry, this page is not found</p>}/>
        </Switch>
      </Container>
      <NavBar/>
    </div>
  );
}

export default App;
