import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, X } from "lucide-react";

const FileUpload = ({ 
  accept = "image/*", 
  onChange, 
  disabled = false, 
  type = "profile",
  maxSizeMB = 5
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const validateFile = (selectedFile) => {
    setError("");

    // Check if file is selected
    if (!selectedFile) {
      setError("Please select a file.");
      return false;
    }

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return false;
    }

    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB.`);
      return false;
    }

    // Additional validation for ID documents
    if (type === "id") {
      const img = new Image();
      img.onload = () => {
        if (img.width < 800 || img.height < 600) {
          setError("ID image must be at least 800x600 pixels.");
          setFile(null);
          setPreview(null);
          onChange(null);
          return false;
        }
      };
      img.src = URL.createObjectURL(selectedFile);
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      onChange(selectedFile);
    } else {
      e.target.value = null;
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setError("");
    onChange(null);
  };

  // Cleanup preview URL when component unmounts or file changes
  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={`${type} preview`}
                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              />
              <Button
                type="button"
                onClick={handleRemoveFile}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                variant="destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <Camera className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <Label htmlFor={`file-upload-${type}`}>
          {type === "id-front" 
                    ? "Upload ID Document" 
                    : type === "id-back" 
                      ? "Upload ID Document" 
                      : "Upload Profile Photo"}

          </Label>
          <div className="text-sm text-gray-500">
            {type === "id-front" 
              ? "Please upload a clear photo of your ID document (min 800x600px)"
              : type === "id-back" 
                      ? "Please upload a clear photo of your ID document (min 800x600px)" 
              : "Choose a photo for your profile (max 5MB)"}
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
            id={`file-upload-${type}`}
          />
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => document.getElementById(`file-upload-${type}`).click()}
            disabled={disabled}
          >
            {file ? "Replace File" : "Choose File"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FileUpload;