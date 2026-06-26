"use client";

import { useState } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";

interface PhotoUploadProps {
  onImageChange?: (url: string | null) => void;
  className?: string;
  label?: string;
}

export function PhotoUpload({ onImageChange, className = "", label = "Add Photo" }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleSimulateUpload = () => {
    // In a real app, this would open file picker
    // We simulate by setting a placeholder image
    const demoUrl = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400";
    setPreview(demoUrl);
    if (onImageChange) onImageChange(demoUrl);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (onImageChange) onImageChange(null);
  };

  return (
    <div 
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer
        ${preview ? "border-transparent" : "border-border-medium hover:border-accent-gold bg-bg-input/50"} ${className}`}
      onClick={!preview ? handleSimulateUpload : undefined}
    >
      {preview ? (
        <>
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          <button 
            onClick={handleClear}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/70"
          >
            <X size={16} />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center text-text-muted gap-2">
          <div className="w-12 h-12 rounded-full bg-bg-card-light shadow-sm flex items-center justify-center text-accent-gold">
            <Camera size={24} />
          </div>
          <span className="text-body-md">{label}</span>
        </div>
      )}
    </div>
  );
}
