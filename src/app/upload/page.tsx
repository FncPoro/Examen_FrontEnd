"use client";

import ImageUploader from "@/components/ImageUploader";
import { api } from "@/services/api";
import { useState } from "react";

export default function UploadPage() {
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleUpload = async (url: string) => {
    setUploadedUrl(url);
    try {
      await api("/images", {
        method: "POST",
        body: JSON.stringify({ url }),
      });
      console.log("Imagen guardada en la DB");
    } catch (err) {
      console.error("Error guardando la URL en DB", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subir Imagen</h1>
      <ImageUploader onUpload={handleUpload} />
      {uploadedUrl && (
        <div className="mt-4">
          <p>URL guardada en DB:</p>
          <a href={uploadedUrl} target="_blank" className="text-blue-500 underline">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
