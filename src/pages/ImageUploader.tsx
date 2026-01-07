import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  existingImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, existingImage }) => {
  const [preview, setPreview] = useState<string>(existingImage || '');

  //Convert to Dynamic/Databased after done with whole design layout
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageUpload(imageUrl);
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  const handleRemoveImage = () => {
    setPreview('');
    onImageUpload('');
  };

  return (
    <div className="image-uploader">
      {preview ? (
        <div className="image-preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <button 
            type="button" 
            className="remove-image-btn"
            onClick={handleRemoveImage}
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div 
          {...getRootProps()} 
          className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="upload-placeholder">
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <>
                <div className="upload-icon"></div>
                <p>Drag & drop an image here, or click to select</p>
                <small>Supports: JPEG, PNG, GIF, WEBP</small>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;