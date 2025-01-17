import React, { useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prevImages) => prevImages.concat(newImages));
    uploadFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        handleFiles([items[i].getAsFile()]);
      }
    }
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const uploadFiles = (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images', file);
    });

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div
      className="image-upload"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input" className="upload-label">
        Drag & Drop or Click to Upload Images
      </label>
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`upload-preview-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;