import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Getresult from './Getresult.js';
import { Link } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = () => {

    // let history = useHistory();

    const [team, setTeam] = useState("")
    const [fromDate, setFromDate] = useState("yyyy-mm-dd")
    const [toDate, setToDate] = useState("yyyy-mm-dd")
    const [date, setDate] = useState("")
    const [exactDate, setexactDate] = useState("")
    const [hteam, setHteam] = useState("")
    const [hlogo, setHlogo] = useState("")
    const [ateam, setAteam] = useState("")
    const [alogo, setAlogo] = useState("")
    const [city, setCity] = useState("")
    const [stadium, setStadium] = useState("")
    const [breweries, setBreweries] = useState([])


    const addMatch = async () => {
        const inputs = {team: team, fromDate: fromDate, toDate: toDate, exactDate: exactDate}
        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/',
          data: inputs,
        }).then(response=>{
          // console.log(response.data)
          setDate(response.data.match_data.match_date)
          setHteam(response.data.match_data.home_team_name)
          setHlogo(response.data.match_data.home_team_logo)
          setAteam(response.data.match_data.away_team_name)
          setAlogo(response.data.match_data.away_team_logo)
          setCity(response.data.match_data.city)
          setStadium(response.data.match_data.stadium)  
          setBreweries(response.data.breweries)   
        })
    }
 
    return (
      
        <div className="container">
          <h1>Find breweries from the football game</h1>
        <div className="container">
        <div className="w-75 mx-auto shadow p-5">
        
    
        <div className="form-group col-md-1">
        <label>Favourite team name: </label>
        <input name="team" id="inputTeam" value={team} onChange={(e) => setTeam(e.target.value)}/>
        </div>
        <span>
          <br />
        </span>
        <div className='prompt1'>Not sure of which game to go and see? 
          Enter the range of dates below and we'll help you find the closest incoming game of your favourite team!</div>
        <div className="form-group col-md-2">
        <label>From date: </label>
        <input name="fromDate" id="inputFromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
        </div>

        <div className="form-group col-md-2">
        <label>To date: </label>
        <input name="toDate" id="inputToDate" value={toDate} onChange={(e) => setToDate(e.target.value)}/>
        </div>
        <span>
          <br />
        </span>

        <div className="form-group col-md-4">
        <div className='prompt2'>Already know the exact match you wanna watch? Enter the date below if you know the exact date of the match: </div>
        <label>Exact date: </label>
        <input name="exactDate" id="inputExactDate" value={exactDate} onChange={(e) => setexactDate(e.target.value)}/>
        </div>

        {/* <div className="form-group col-md-2">
            <input type="submit" value="Show results" class="btn btn-primary"/>
        </div> */}
            
        <button className="btn btn-primary btn-block" onClick={addMatch}>Add match</button> 
       
      </div>
      
    </div>
        <span>
          <br />
        </span>
    {
      (hlogo!=="")&&
    <> 
       <div>Search result:</div>
       {{fromDate} ==="yyyy-mm-dd" && <div>match date of the game you are going to watch: <div>{date}</div> </div>}
       {{fromDate} !=="yyyy-mm-dd" && <div>closest match day of your favourite football team: <div>{date}</div> </div>}
          <td align="center" className='team'>
            <div className='horizontal'>
              <img src={hlogo} alt="" />
              <div className='hteam'>home team: {hteam}</div>
            </div>
            <div className='horizontal'>
              <img src={alogo} alt="" />
              <div className='ateam'>away team: {ateam}</div>
            </div>
          </td>
          <div>city of the game: {city}</div>
          <div>stadium name: {stadium}</div>
          
          <Link to="/details" state= {breweries} className='breweries'>breweries near the stadium </Link>
          
          {/* <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/details"
            >
              breweries near the stadium
            </NavLink> */}
    </>

     }
     
     {/* <div>city of the game: {{match_data.city}}</div>
    <div>stadium name: {{match_data.stadium}}</div>
    <br /> 
    <div>list of breweries:</div>
    <br /> 
    <td>
    <div>Brewery name: {{pub.pub_name}}</div>
    <div>street address: {{pub.address1}}</div>
    <div>city: {{pub.city}}</div>
    <div>ratings: {{pub.rating}}</div>
    </td>
    <br />   */}
        </div>
    

    );
};

export default Searchbar;
