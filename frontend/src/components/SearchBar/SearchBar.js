import {useRef, useState} from 'react';
import axios from 'axios';
import './SearchBar.css';

function SearchBar() {
    const teamRef = useRef();
    const dateRef = useRef();
    const [searchClicked, setSearchClicked] = useState(false);
    const [breweries, setData] = useState([]);
    const [team1Logo, setLogo1] = useState("");
    const [team2Logo, setLogo2] = useState("");
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAdress] = useState("");
    const [venueCity, setVenueCity] = useState("");
    

    const onSubmit = () => {
        setSearchClicked(!searchClicked);

        const inputs = {
            team : teamRef.current.value,
            date : dateRef.current.value
        };
        
        const req = axios.post('http://127.0.0.1:8000/getBreweries/',inputs).then((response => {
            const brews = response.data['breweries']
            const logo1 = response.data['team1_logo']
            const logo2 = response.data['team2_logo']
            const vName = response.data['venue_name']
            const vAddress = response.data['venue_address']
            const vCity = response.data['venue_city']

            setData(brews)
            setLogo1(logo1)
            setLogo2(logo2)
            setVenueName(vName)
            setVenueAdress(vAddress)
            setVenueCity(vCity)

            console.log(response.data)
        }
        ))
    }
    
    return (
        <div>
        {searchClicked ?
            //  {breweries.map()}
            <>
            <div className='Game'>
                <div className='img_row'>
                    <div className='img_col'>
                        <img src={team1Logo}/>
                        {/* Add team name */}
                    </div>
                    <div className='img_col'>
                        <h1>VS</h1>
                    </div>
                    <div className='img_col'>
                        <img src={team2Logo}/>
                        {/* Add team name */}
                    </div>
                </div>
                
            </div>
            <div>
                {/* Venue info */}
                <p>{venueName}</p>
                <p>{venueAddress}</p>
                <p>{venueCity}</p>
                {/* Game Time */}
                
            </div>
            {breweries.map(
                (brewery => <div className="Brewery List"><table>
                    {/* <tr>
                        <th>Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Phone Number</th>
                        <th>Website</th>
                    </tr> */}
                    <tr>
                        <td>{brewery.name}</td>
                        <td>{[brewery.street, brewery.city, brewery.country]}</td>
                        <td>{brewery.phone}</td>
                        <td>{brewery.website_url}</td>
                    </tr>
                    </table>
                    </div>))}
            </>
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
