import React from "react";
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import '../../node_modules/leaflet/dist/leaflet.css';
const MapComponent = ({longitude,latitude}) => {
    const lon=longitude || 51.505;
    const lat=latitude || -0.09;
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='location of the event'
        url=""
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
