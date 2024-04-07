/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import bus from "../../assets/busSelected.png";
import bus2 from "../../assets/busNotSelected.png";

function TTCTracker() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDo6mk8x9SbjCeZz2aSI35TfKR6hxB47so",
  });
  const [vehicles, setVehicles] = useState<any>();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 43.72436, lng: -79.37812 });
  const [selectedBus, setSelectedBus] = useState<any>();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3333");
    socket.onopen = () => {
      console.log("WebSocket connected");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setVehicles(data);

        console.log('data', data)
        const foundBus = data.vehicle.find((bus: any) => bus?.id === selectedBus?.id)
        setSelectedBus(foundBus)
      
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      socket.close();
    };
  }, []);

  console.log(selectedBus);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const onMapMove = () => {
    // Update the center coordinates when the map is moved
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
                  <p>Last updated: {selectedBus.secsSinceReport} Seconds ago</p>
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
                vehicles.vehicle?.map((vehicle: any) => (
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
