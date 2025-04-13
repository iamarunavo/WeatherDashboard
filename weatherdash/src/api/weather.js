
const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

export const fetchCityWeather = async (cities) => {
  const responses = await Promise.all(
    cities.map(async (city) => {
      const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(city)}&country=US&units=I&key=${API_KEY}`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        return json.data?.[0]; 
      } catch (error) {
        console.error(`Failed to fetch weather for ${city}`, error);
        return null;
      }
    })
  );
  return responses.filter(Boolean); 
};


export const fetchSingleCityWeather = async (city) => {
  const API_KEY = import.meta.env.VITE_WEATHERBIT_KEY;
  const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(city)}&country=US&units=I&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.data?.[0]; 
  } catch (error) {
    console.error("Error fetching single city weather:", error);
    return null;
  }
};
