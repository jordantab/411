import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
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
