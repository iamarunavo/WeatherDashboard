import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import { fetchSingleCityWeather } from './api/weather';

const DetailPage = () => {
  const { cityName } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchSingleCityWeather(cityName).then(setWeather);
  }, [cityName]);

  if (!weather) return <div className="dashboard">Loading...</div>;

  return (
    <div className="layout">
      <NavBar />
      <div className="dashboard">
        <h2>📍 Weather Details for {decodeURIComponent(cityName)}</h2>

        <p><strong>Temperature:</strong> {weather.temp}°F</p>
        <p><strong>Wind Speed:</strong> {weather.wind_spd.toFixed(1)} mph</p>
        <p><strong>Humidity:</strong> {weather.rh}%</p>
        <p><strong>Condition:</strong> {weather.weather.description}</p>
        <p><strong>Visibility:</strong> {weather.vis} mi</p>
        <p><strong>Pressure:</strong> {weather.pres} mb</p>

        <br />
        <Link to="/">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default DetailPage;
