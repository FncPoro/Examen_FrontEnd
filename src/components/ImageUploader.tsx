"use client";

import useImageUpload from "@/hooks/useImageUpload";

type Props = {
  onUpload?: (url: string) => void;
};

export default function ImageUploader({ onUpload }: Props) {
  const { file, imageUrl, uploading, handleFileChange, uploadImage, setImageUrl } = useImageUpload();

  const handleClick = async () => {
    const url = await uploadImage();
    if (url && onUpload) onUpload(url);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleClick}
        disabled={!file || uploading}
        className="bg-blue-500 text-white px-4 py-2 disabled:opacity-50"
      >
        {uploading ? "Subiendo..." : "Subir Imagen"}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Imagen subida:</p>
          <img src={imageUrl} alt="Subida" className="w-64 h-64 object-cover border" />
        </div>
      )}
    </div>
  );
}
