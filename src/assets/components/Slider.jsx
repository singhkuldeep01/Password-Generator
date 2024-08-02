import React, { useState } from 'react';
import './Slider.css'; // Import the CSS file

const Slider = () => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="custom-slider"
      />
    </div>
  );
};

export default Slider;
