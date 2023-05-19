import styles from './components/App.module.css';
import NavBar from "./components/NavBar";
import Header from './components/Header';

function App() {
  return (
    <div className={styles.App}>
      <Header/>
      <NavBar/>
    </div>
  );
}

export default App;
