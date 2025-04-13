import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import './App.css';
import { fetchCityWeather } from './api/weather';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar
} from 'recharts';

const cities = [
  "New York", "Los Angeles", "Chicago", "Miami", "Houston",
  "Phoenix", "San Diego", "Dallas", "Seattle", "Boston"
];

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCityWeather(cities).then(setWeatherData);
  }, []);

  const filteredData = weatherData.filter(item =>
    item.city_name.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? item.weather.description === filter : true)
  );

  const avgTemp = weatherData.length
    ? (weatherData.reduce((sum, item) => sum + item.temp, 0) / weatherData.length).toFixed(1)
    : 'N/A';

  const maxWind = weatherData.length
    ? Math.max(...weatherData.map(item => item.wind_spd)).toFixed(1)
    : 'N/A';

  const commonCondition = (() => {
    const count = {};
    for (let item of weatherData) {
      count[item.weather.description] = (count[item.weather.description] || 0) + 1;
    }
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  })();

  return (
    <div className="layout">
      <NavBar />
      <div className="dashboard">
        
  
        <div className="summary-cards">
          <div className="card">Avg Temp: {avgTemp}°F</div>
          <div className="card">Max Wind: {maxWind} mph</div>
          <div className="card">Most Common: {commonCondition}</div>
        </div>
  
        <div className="controls">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Conditions</option>
            {[...new Set(weatherData.map(w => w.weather.description))].map((desc) => (
              <option key={desc} value={desc}>{desc}</option>
            ))}
          </select>
        </div>
        <div className="content-flex">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temp (°F)</th>
              <th>Wind (mph)</th>
              <th>Humidity (%)</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((w) => (
              <tr key={w.city_name}>
                <td>
                  <Link to={`/city/${encodeURIComponent(w.city_name)}`}>
                    {w.city_name}
                  </Link>
                </td>
                <td>{w.temp}</td>
                <td>{w.wind_spd.toFixed(1)}</td>
                <td>{w.rh}</td>
                <td>{w.weather.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="charts">
        <div className="chart">
          <h3>🌡️ Temperature by City</h3>
          <LineChart width={400} height={200} data={weatherData}>
            <XAxis dataKey="city_name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="chart">
          <h3>💨 Wind Speed by City</h3>
          <BarChart width={400} height={200} data={weatherData}>
            <XAxis dataKey="city_name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="wind_spd" fill="#82ca9d" />
          </BarChart>
        </div>
        </div>
      </div>

      </div>
    </div>
  );
  
}

export default App;
