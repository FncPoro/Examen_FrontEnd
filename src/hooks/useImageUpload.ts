"use client";

import { useState } from "react";

export default function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    imageUrl,
    uploading,
    handleFileChange,
    uploadImage,
    setImageUrl,
  };
}
