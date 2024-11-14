import MyMap from "./components/map-components";
import { MapProvider } from "./context/useContext";

const App = () => {
  return (
    <MapProvider>
      <MyMap />
    </MapProvider>
  );
};

export default App;
