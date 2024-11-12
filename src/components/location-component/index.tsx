import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";

type LocationComponentsProps = {
  onChange?: (location: { lon: number; lat: number }) => void;
  setErrorsHandler?: (value?: string) => void;
  className?: string;
};

const LocationComponent: React.FC<LocationComponentsProps> = ({
  onChange,
  setErrorsHandler,
  className,
}) => {
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          if (onChange) {
            try {
              await onChange({ lon, lat });
              console.log("Location fetched successfully!");
            } catch (err) {
              console.error("Error in onChange callback:", err);
            }
          }
          setError(null); // Clear any error
        },
        (error: GeolocationPositionError) => {
          setError("دسترسی به موقعیت مکانی امکان‌پذیر نیست");
          console.error("Geolocation error:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند");
    }
  };

  useEffect(() => {
    if (setErrorsHandler) {
      setErrorsHandler(error ?? "");
    }
  }, [error]);

  return (
    <div>
      <button onClick={getLocation} className={`absolute z-40 ${className}`}>
        <CiLocationOn size={30} />
      </button>
    </div>
  );
};

export default LocationComponent;
