import { LatLngTuple } from "leaflet";
import { createContext, useContext, useState } from "react";

type ContextProviderType = {
  location: LatLngTuple;
  zoom: number;
  cityName: string;
  setCityName: (value: string) => void;
  setZoom: (value: number) => void;
  setLocation: (value: LatLngTuple) => void;
};

const MapContext = createContext<ContextProviderType | null>(null);

type MapProviderType = {
  children: React.ReactNode;
};

export const MapProvider = ({ children }: MapProviderType) => {
  const [location, setLocation] = useState<LatLngTuple>([35.6892, 51.389]);
  const [zoom, setZoom] = useState<number>(13);
  const [cityName, setCityName] = useState<string>("");
  return (
    <MapContext.Provider
      value={{ location, setLocation, zoom, setZoom, cityName, setCityName }}
    >
      {children}
    </MapContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
