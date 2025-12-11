"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMap } from "react-leaflet";

const markerIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}


export default function MapWithSearch() {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [query, setQuery] = useState("");

  const searchAddress = async () => {
    if (!query) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setMarkers([...markers, { lat: parseFloat(lat), lng: parseFloat(lon) }]);
    } else {
      alert("Dirección no encontrada");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Buscar dirección..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-1 flex-1"
        />
        <button onClick={searchAddress} className="bg-blue-500 text-white px-4">
          Buscar
        </button>
      </div>

      <MapContainer center={[40.4168, -3.7038]} zoom={13} className="h-[500px] w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lng]} icon={markerIcon} />
        ))}
        {markers.length > 0 && <MapUpdater center={[markers[markers.length - 1].lat, markers[markers.length - 1].lng]} />}
    </MapContainer>

    </div>
  );
}
