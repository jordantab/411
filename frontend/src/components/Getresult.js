import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Searchbar from './Searchbar';
import { useLocation, Link } from 'react-router-dom';
import './Getresult.css'

const Getresult = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className='background'>
       {
        
        data.map((pub) => ( 
            <p> 
            <div className='name'>Brewery name: {pub.pub_name}</div>
            <div>street address: {pub.address1}</div>
            <div>city: {pub.city}</div>
            <div>ratings: {pub.rating}</div>
            <div>phone number: {pub.phone}</div>
            <a href={pub.url}>Check brewery detail through clicking this link!</a>
            
            </p>
           
        ))
       }
    </div>
  )
}

export default Getresult;

