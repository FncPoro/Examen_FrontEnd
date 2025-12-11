"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = L.icon({ iconUrl: "/marker-icon.png", iconSize: [25,41], iconAnchor:[12,41] });

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function MapComponent() {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [query, setQuery] = useState("");

  const searchAddress = async () => {
    if (!query) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      const newMarker = { lat: parseFloat(lat), lng: parseFloat(lon) };
      setMarkers([...markers, newMarker]);
      setQuery(`${display_name} (${lat}, ${lon})`);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="border p-1 flex-1" />
        <button onClick={searchAddress} className="bg-blue-500 text-white px-4">Buscar</button>
      </div>

      <MapContainer center={[40.4168, -3.7038]} zoom={13} className="h-[500px] w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => <Marker key={i} position={[m.lat, m.lng]} icon={markerIcon} />)}
        {markers.length > 0 && <MapUpdater center={[markers[markers.length-1].lat, markers[markers.length-1].lng]} />}
      </MapContainer>
    </div>
  );
}
