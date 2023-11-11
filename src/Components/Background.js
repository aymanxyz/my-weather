import Search from "./search";
import WeatherData from "./weatherData";
export default function Background() {
  return (
    <div className='w-screen h-screen background relative'>
        <Search/>
        <WeatherData/>
    </div>
  )
}
