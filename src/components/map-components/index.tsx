import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationComponent from "../location-component";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Map, LatLngTuple, LeafletEvent } from "leaflet";
// import L from "leaflet";

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: import("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: import("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: import("leaflet/dist/images/marker-shadow.png"),
// });
const MapExample = () => {
  const [location, setLocation] = useState<LatLngTuple>([35.6892, 51.389]);
  const [zoom, setZoom] = useState<number>(13);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(location, zoom); // تنظیم مرکز جدید و زوم نقشه
    }
  }, [location]);
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
        <Marker position={location}>
          <Popup>موقعیت تهران</Popup>
        </Marker>
      </MapContainer>
      <LocationComponent
        className="right-0"
        onChange={(e) => {
          setLocation([e.lat, e.lon]);
          setZoom(27);
        }}
      />
    </div>
  );
};

export default MapExample;
