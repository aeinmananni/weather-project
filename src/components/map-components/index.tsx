import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationComponent from "../location-component";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { Map, LeafletEvent } from "leaflet";
import { useMapContext } from "../../context/useContext";
import LocationMarker from "../location-marker";

// import L from "leaflet";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: import("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
// });
const MapExample = () => {
  const { location, setLocation, zoom, setZoom, cityName, setCityName } =
    useMapContext();

  const mapRef = useRef<Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(location, zoom);
    }
  }, [location, cityName]);

  const handelerGetNameCity = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setCityName(
        data.address.city ||
          data.address.town ||
          data.address.village ||
          "نامشخص"
      );
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  console.log(cityName);
  return (
    <div className="relative">
      <MapContainer
        center={location}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        whenReady={(event: LeafletEvent) => {
          return (mapRef.current = event.target as Map);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker o position={location}>
          <Popup>موقعیت تهران</Popup>
        </Marker>
        <LocationMarker handelerGetNameCity={handelerGetNameCity} />
      </MapContainer>
      <LocationComponent
        className="right-0"
        onChange={(e) => {
          setLocation([e.lat, e.lon]);
          handelerGetNameCity(e.lat, e.lon);
          setZoom(27);
        }}
      />
    </div>
  );
};

export default MapExample;
