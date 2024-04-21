/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import bus from "../../assets/busSelected.png";
import bus2 from "../../assets/busNotSelected.png";
interface Bus {
  routeTag: string;
  predictable: string;
  heading: string;
  speedKmHr: string;
  lon: string;
  id: string;
  dirTag: string;
  lat: string;
  secsSinceReport: string;
}

function TTCTracker() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const [vehicles, setVehicles] = useState<Bus[]>();
  const [map, setMap] = useState<any>(null);
  const [center, setCenter] = useState({ lat: 43.72436, lng: -79.37812 });
  const [selectedBus, setSelectedBus] = useState<Bus | undefined>(undefined);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3333");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("delta: ", data);
      setVehicles((prevVehicles) => {
        if (!prevVehicles) {
          console.log("nothing here: ");
          return data;
        } else {
          return prevVehicles.map((vehicle) => {
            const updatedVehicle = data.find(
              (delta: Bus) => delta.id === vehicle.id
            );
            if (updatedVehicle) {
              return updatedVehicle;
            }
            return vehicle;
          });
        }
      });
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (selectedBus && vehicles) {
      const foundBus = vehicles.find((bus: Bus) => bus.id === selectedBus.id);
      if (foundBus) {
        setSelectedBus(foundBus);
      }
    }
  }, [vehicles]);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onMapMove = () => {
    if (map) {
      const newCenter = map?.getCenter();
      console.log(map.getCenter());
      setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };

  return isLoaded ? (
    <div className="TTC-tracker-app">
      <div className="container-main container-fluid px-0">
        <div className="parent-row row">
          <div className="command-center-container col-3">
            <div className="command-center-header row px-3">
              {selectedBus && (
                <div>
                  <h4>Selected Bus</h4>
                  <p>Route: {selectedBus.routeTag}</p>
                  <p>Speed: {selectedBus.speedKmHr}KM/H</p>
                  <p>Heading: {selectedBus.heading}</p>
                  <p>Latitude: {selectedBus.lat}</p>
                  <p>Longitude: {selectedBus.lon}</p>
                </div>
              )}
            </div>
          </div>
          <div className="google-map-container col-9">
            <GoogleMap
              center={center}
              zoom={13}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onDragEnd={onMapMove}
              mapContainerStyle={{ height: "100%" }}
            >
              {vehicles &&
                vehicles.map((vehicle: any) => (
                  <div>
                    <Marker
                      onClick={() => setSelectedBus(vehicle)}
                      icon={selectedBus?.id === vehicle.id ? bus : bus2}
                      key={vehicle.id}
                      position={{
                        lat: parseFloat(vehicle.lat),
                        lng: parseFloat(vehicle.lon),
                      }}
                    />
                  </div>
                ))}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default TTCTracker;
