import React, { useState, useEffect } from "react";
import { Input, FormText } from "reactstrap";

const ImageUploader = ({ initialImage, onUploadSuccess }) => {
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/djgripb6t/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "jacs06";

  const [imagePreview, setImagePreview] = useState(initialImage || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Actualiza la vista previa si `initialImage` cambia
    setImagePreview(initialImage);
  }, [initialImage]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    setLoading(true);
    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImagePreview(data.secure_url);
        onUploadSuccess(data.secure_url);
      } else {
        console.error("Error uploading image:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Vista previa"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#aaa" }}>Sin imagen</span>
        )}
      </div>
      <Input
        type="file"
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
        disabled={loading}
      />
      {loading && <FormText color="muted">Cargando imagen...</FormText>}
    </div>
  );
};

export default ImageUploader;
