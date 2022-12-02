import './App.css';
import SearchBar from 'frontend/src/components/SearchBar/SearchBar.jsx';
import { Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
