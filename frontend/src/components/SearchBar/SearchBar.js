import {useRef, useState} from 'react';
import axios from 'axios';

function SearchBar() {
    const teamRef = useRef();
    const dateRef = useRef();
    const [searchClicked, setSearchClicked] = useState(false);
    const [breweries, setData] = useState(null);
    

    const onSubmit = () => {
        setSearchClicked(!searchClicked);

        const inputs = {
            team : teamRef.current.value,
            date : dateRef.current.value
        };
        
        const req = axios.post('http://127.0.0.1:8000/getTeamID/',inputs).then((response => {
            const brews = response.data
            console.log(brews)
            setData(brews)
        }
        ))
    }
    
    return (
        <div>
        {searchClicked ?
            // {names.map()}
            <h1>hey</h1>
            // {breweries.map()}
            :
            <>
            <h1>Find Breweries!</h1>
            <input
            type="text"
            id="header-search"
            placeholder="Team"
            name="team"
            ref={teamRef} 
            
        />
        <input
            type="date"
            id="header-search"
            placeholder="Date"
            name="date" 
            ref={dateRef}
        />
        <button onClick={onSubmit}>Search</button>
        </>
            
            }
    </div>
    );
}

export default SearchBar;
