import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux';
import { setData } from '../redux/store/weatherSlice/weatherSlice';
import axios from 'axios';
export default function Search() {
    const [citys , setCitys] = useState([]);
    const dispatch = useDispatch();
    const [myGeoPos, setMyGeoPos] = useState();
    const bl = async (e) => {
        setCitys([]);
        const value = e.target.value;
        if (value.length < 1) return;
        try {
          const res = await axios({
            method :'GET',
            url : `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=34cfbfb31b1a41b78e4115d0782317fa`
          })
          if (res.data.results.length < 1) return;
          if (res) {
            res.data.results.map((result) => {
                const {city, country ,country_code, lat, lon } = result;
                    if (city && country && country_code && lat && lon) {
                        if (citys.find((value) => value.city === String(city))) return null;
                        const cityAndCountry = [{city, country,country_code, lat, lon }];
                        const newResult = citys.concat(cityAndCountry);
                        return setCitys(newResult);
                    }
                    
                return null;
              })
              
          }
        } catch(err) {
          console.log(err);
        }
      }
      const handleSelect = async (e, lon, lat) => {
        try {
            const res = await axios({
                method : 'GET',
                url : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=73adefc8d69bb05c610f3b06f269059e`
            })
            if (res) {
              dispatch(setData(res.data));
            }
        } catch(er) {
          console.log(er);
        }
      }

      

      const setGeoLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          setMyGeoPos({lat : position.coords.latitude, lon : position.coords.longitude});
       })
       
      }

      useEffect(() => {
        const m = async () =>  {
          if (!myGeoPos) return;
          try {
            const res = await axios({
                method : 'GET',
                url : `https://api.openweathermap.org/data/2.5/weather?lat=${myGeoPos.lat}&lon=${myGeoPos.lon}&appid=73adefc8d69bb05c610f3b06f269059e`
            })
            if (res) {
              dispatch(setData(res.data));
            }
          } catch(er) {
            console.log(er);
          }
        }
        m();
      })
        
      useEffect(() => {
        if (navigator.geolocation) {
          setGeoLocation();
        }
      }, [])
      
  return (
    <form className='mx-auto w-2/4 h-20 pt-4 relative'>
        <ul className='absolute w-full'>
            <li><input onChange={bl} placeholder='enter your City' className=' w-3/4 mx-auto block h-11 outline-none px-4'></input></li>
            
            {citys.length > 0 && citys.map((city,index) => <li key={index} onClick={event => handleSelect(event, city.lon, city.lat)} className=' search_result'>{city.city} , {city.country}</li> )}
        </ul>
    </form>
  )
}
