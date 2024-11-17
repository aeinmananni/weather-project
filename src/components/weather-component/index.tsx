import axios from "axios";
import { useEffect, useState } from "react";
import { useMapContext } from "../../context/useContext";
const apikey = import.meta.env.VITE_API_KEY;

const Weather = () => {
  const { location } = useMapContext();
  const [state, setState] = useState(null);
  const latitude = parseFloat(location[0].toFixed(2));
  const longitude = parseFloat(location[1].toFixed(2));
  const handelApiInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      const response = await axios.get(url);
      console.log(response.data);
      setState(response.data);
    } catch (error) {
      if (
        location[0] < -90 ||
        location[0] > 90 ||
        location[1] < -180 ||
        location[1] > 180
      ) {
        console.error("Invalid latitude or longitude values:", location, error);
        return;
      }
    }
  };
  useEffect(() => {
    handelApiInfo();
  }, [location]);
  console.log(latitude);
  return (
    <div>
      <pre className="">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Weather;
