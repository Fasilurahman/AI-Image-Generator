import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ImageGenerator.css';
import default_image from '../../assets/default_image.svg';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      return;
    }

    const query = inputRef.current.value;
    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

    try {
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query: query,  // Search term, e.g., 'nature'
          per_page: 1,    // Number of results per page
        },
      });

      // Get the first image from the results
      const image = response.data.photos[0].src.original;
      setImageUrl(image); // Set the image URL to state
    } catch (error) {
      console.error("API Error: ", error);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl || default_image} alt="Generated" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div onClick={generateImage} className="generate-btn">
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
