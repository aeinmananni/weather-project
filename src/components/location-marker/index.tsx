import { useMapEvents } from "react-leaflet";
import { useMapContext } from "../../context/useContext";

type LocationMarkerProps = {
  handelerGetNameCity: (lat: number, lon: number) => void;
};

const LocationMarker = ({ handelerGetNameCity }: LocationMarkerProps) => {
  const { setLocation, setZoom } = useMapContext();
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setLocation([lat, lng]);
      setZoom(13); // Adjust zoom if necessary
      handelerGetNameCity(lat, lng);
    },
  });
  return null;
};

export default LocationMarker;
