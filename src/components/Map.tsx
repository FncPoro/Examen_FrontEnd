"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

type MarkerType = {
  lat: number;
  lng: number;
  name?: string;
};

type Props = {
  markers?: MarkerType[];
  onCoordsChange?: (coords: { lat: number; lng: number }) => void;
  address?: string;
};

export default function MapComponent({ markers: initialMarkers = [], onCoordsChange, address }: Props) {
  const [markers, setMarkers] = useState<MarkerType[]>(initialMarkers);
  const [query, setQuery] = useState(address || "");

  // Cada vez que cambie la dirección en el input del formulario
  useEffect(() => {
    setQuery(address || "");
  }, [address]);

  const searchAddress = async () => {
    if (!query) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      const newMarker = { lat: parseFloat(lat), lng: parseFloat(lon), name: display_name };
      setMarkers([newMarker]); // reemplaza marcador anterior
      if (onCoordsChange) onCoordsChange({ lat: parseFloat(lat), lng: parseFloat(lon) });
      setQuery(`${display_name} (${lat}, ${lon})`);
    }
  };

  const handleMapClick = (e: any) => {
    const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
    setMarkers([newMarker]);
    if (onCoordsChange) onCoordsChange(newMarker);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-1 flex-1 rounded"
          placeholder="Buscar dirección"
        />
        <button onClick={searchAddress} className="bg-blue-500 text-white px-4 rounded">
          Buscar
        </button>
      </div>

      <MapContainer
        center={markers[0] ? [markers[0].lat, markers[0].lng] : [40.4168, -3.7038]}
        zoom={13}
        className="h-[400px] w-full rounded"
        whenCreated={(map) => map.on("click", handleMapClick)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={markerIcon}>
            {m.name && <Popup>{m.name}</Popup>}
          </Marker>
        ))}
        {markers.length > 0 && <MapUpdater center={[markers[markers.length - 1].lat, markers[markers.length - 1].lng]} />}
      </MapContainer>
    </div>
  );
}
