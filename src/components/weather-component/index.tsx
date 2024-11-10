import axios from "axios";
import { useEffect, useState } from "react";

const apikey = "3676WXHDCSPRVND4AR8NCFEAX";

const Weather = () => {
  const [state, setState] = useState(null);

  const handelApiInfo = async () => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=${apikey}`
      );
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handelApiInfo();
  }, [state]);
  return (
    <div>
      <pre className="">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Weather;
