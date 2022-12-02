import './App.css';
import BreweryList from './components/BreweryList/BreweryList';
import SearchBar from './components/SearchBar/SearchBar';
import { Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Find Breweries!</h1>
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
