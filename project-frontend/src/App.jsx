import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './Components/MainRouter';
import './App.css';
import NavigationBar from './Components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <MainRouter />
    </Router>
  );
}

export default App;