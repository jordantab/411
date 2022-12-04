import Searchbar from './components/Searchbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Getresult from './components/Getresult';

function App() {
  return (
    <div className="App">
      
      <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Searchbar/>} />
            
          <Route exact path="/details" element={<Getresult/>} />
            
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
