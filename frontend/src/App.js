import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BreweryList from './components/BreweryList/BreweryList.js';
import Navbar1 from './components/Navbar1/Navbar1.js';
import LoginPage from './components/Views/LoginPage';
import RegisterPage from './components/Views/RegisterPage';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <div className="App">
      
      
      
      <BrowserRouter>
      <Navbar1 />
      <header className="App-header">
      
        <Routes>

          <Route exact path="/" element={<SearchBar/>} />
            
          <Route exact path="/details" element={<BreweryList/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/profile" element={<Profile/>} />
            
        </Routes>
        </header>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
