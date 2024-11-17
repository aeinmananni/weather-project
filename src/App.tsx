import MyMap from "./components/map-components";
import { MapProvider } from "./context/useContext";
import Weather from "./components/weather-component";

const App = () => {
  return (
    <MapProvider>
      <MyMap />
      <Weather />
    </MapProvider>
  );
};

export default App;
