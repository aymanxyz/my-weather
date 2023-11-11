import React, { useState } from 'react'
import weatherSelector from '../redux/selectors/weatherSelector';
import { useSelector } from 'react-redux';
export default function WeatherData() {
  const weather = useSelector(weatherSelector);
  if (!weather.name) return;
  let d = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let weekDay = days[d.getDay()];
  //let hours = new Date().getHours();
  
  let currentDate = new Date();

  // Get hours and minutes
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  // Add leading zero if needed
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  // Display the local time in the desired format
  var formattedTime = hours + ':' + minutes;

  return (
    <div className='text-white opacity-background rounded-lg w-10/12 h-5/6 mx-auto flex items-center flex-col pt-16 font-bold text-4xl'>
        <div className='text-white text-7xl opacity-100'>{weather.name} ,  {weather.sys.country}</div>
        <div className='bg-yellow-400 rounded-xl px-4 py-2 my-2 mt-4'>{weekDay} , {new Date().getDate()}  </div>
        <div className='mb-20 bg-green-400 rounded-xl px-4 py-2 my-2'>{formattedTime}</div>
        <div className='grid grid-flow-row gap-y-10 text-white opacity-weather-data py-14 px-24 rounded-xl'>
          <div className=' grid grid-flow-col gap-x-32'>
            <div className='w-fit'>Humidity </div>
            <div className='w-fit'>{weather.main.humidity} %</div>
          </div>
          <div className=' grid grid-flow-col gap-x-32'>
            <div className='w-fit'>Clouds </div>
            <div className='w-fit'>{weather.clouds.all}</div>
          </div>
          <div className=' grid grid-flow-col gap-x-32'>
            <div className='w-fit'>Wind N </div>
            <div className='w-fit'>{weather.wind.speed} mph</div>
          </div>
          <div className=' grid grid-flow-col gap-x-32'>
            <div className='w-fit'>Feels Like </div>
            <div className='w-fit'>{weather.main.feels_like}°</div>
          </div>
          
        </div>
        
    </div>
  )
}
