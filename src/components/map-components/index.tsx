import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lon: number;
    lat: number;
  } | null>({
    lon: 5912614.022351064,
    lat: 3928535.049189016,
  });
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [coordinates?.lon ?? 0, coordinates?.lat ?? 0],
        zoom: 5,
      }),
    });

    map.on("click", (event) => {
      const [lon, lat] = event.coordinate;
      setCoordinates({ lon, lat });
    });

    return () => map.setTarget(undefined);
  }, []);
  console.log("LON : ", coordinates?.lon, "LAT : ", coordinates?.lat);
  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default MyMap;
