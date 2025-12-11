"use client"
import dynamic from "next/dynamic";

const MapWithSearch = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Page() {
  return <MapWithSearch />;
}
