// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageId, setImageId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('message', message);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageId(response.data.imageId);
      setImageUrl(null);
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
    }
  };

  const handleFetchImage = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/images/${imageId}`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Erro ao buscar a imagem:', error);
    }
  };

  return (
    <div className="App">
      <h1>Upload de Imagens</h1>
      <input type="text" placeholder="Título" value={title} onChange={handleTitleChange} />
      <textarea placeholder="Mensagem" value={message} onChange={handleMessageChange}></textarea>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageId && (
        <div>
          <h2>Imagem enviada com ID: {imageId}</h2>
          <button onClick={handleFetchImage}>Ver Imagem</button>
        </div>
      )}

      {imageUrl && (
        <div>
          <h2>Imagem Recuperada</h2>
          <img src={imageUrl} alt="Imagem recuperada" />
        </div>
      )}
    </div>
  );
};

export default App;
