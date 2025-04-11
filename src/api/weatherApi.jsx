import axios from "axios";

export const fetchWeather = async (search) => {
  const API_KEY = "0e662eb1afd70291cde7bcca34eec458";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
    );
    console.log("weather data" ,response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};