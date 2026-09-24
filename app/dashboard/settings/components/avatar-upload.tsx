"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, X, Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  value: string | null;
  name: string;
  onChange: (url: string | null) => void;
}

export function AvatarUpload({ value, name, onChange }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setUploading(true);

    try {
      // ⬇️ Upload to your storage (Cloudinary, S3, UploadThing, etc.)
      // Yahan example ke liye base64 use kar rahe hai
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onChange(base64);
        toast.success("Avatar updated");
        setUploading(false);
      };
      reader.readAsDataURL(file);

      // Production me:
      // const formData = new FormData();
      // formData.append("file", file);
      // const res = await fetch("/api/upload", { method: "POST", body: formData });
      // const data = await res.json();
      // onChange(data.url);
    } catch (err) {
      toast.error("Failed to upload image");
      setUploading(false);
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar className="h-20 w-20 border-2">
          {value ? (
            <AvatarImage src={value} alt={name} />
          ) : (
            <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        )}

        {value && !uploading && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-md transition hover:bg-destructive/90"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Camera className="mr-2 h-4 w-4" />
          {value ? "Change Photo" : "Upload Photo"}
        </Button>
        <p className="text-xs text-muted-foreground">
          JPG, PNG up to 2MB
        </p>
      </div>
    </div>
  );
}