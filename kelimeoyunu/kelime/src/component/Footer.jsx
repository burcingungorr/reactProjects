import React from 'react'
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xPng from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Footer = () => {
    const markerIcon = new L.Icon({
        iconUrl: markerIconPng,
        iconRetinaUrl: markerIcon2xPng,
        shadowUrl: markerShadowPng,
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
      });
  return (
     <div > 
     <div className="line1" style={{width:"80%", textAlign: "center", margin:"0 auto" }}></div>
      
   <div className='footer' style={{marginTop:"50px"}}>
<p>444 444 444</p>
<p>kelimelik@gmail.com</p>
    </div>
    <div style={{ display: "flex", justifyContent: "center",marginTop:"40px",marginBottom:"50px" }}>
  <MapContainer center={[40.9833, 29.1278]} zoom={13} scrollWheelZoom={true} style={{ height: "300px", width: "50%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[40.9833, 29.1278]} icon={markerIcon}>
      <Popup>
        İstanbul, Türkiye. <br /> Harita düzgün çalışıyor!
      </Popup>
    </Marker>
  </MapContainer>
</div>
</div>
  )
}

export default Footer