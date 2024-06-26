import React, { useState } from 'react';
import { uploadMedia } from '../../../services/fetchMedia.jsx';
import { useAuth } from '../../user/Login.jsx';
import { Navigate } from 'react-router-dom';
import './PhotoUploader.css';

const PhotoUploader = ({ productId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { loggedIn } = useAuth();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('Image', selectedFile);
      formData.append('ProductID', productId);

      const response = await uploadMedia(formData);
      if (response.success) {
        console.log('Media uploaded successfully:', response.data);
        alert('Media uploaded successfully');
      } else {
        console.error('Error uploading media:', response.error);
        alert('Error uploading media');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Error uploading media');
    }
  };

  if (!loggedIn) {
    return <Navigate to="/issaarchivos/login" />;
  }

  return (
    <div className="uploader-container">
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>Upload images for this product</button>
    </div>
  );
};

export default PhotoUploader;
