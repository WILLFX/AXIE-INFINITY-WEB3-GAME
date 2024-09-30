import React from 'react';
import './loader.css'; // Import the CSS file

const Loader = () => {
  return (
    <div className="loader-container">
      <img
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjg2cmFvbnNmaWw4aHlpNjZwd2Z6d3AzZDE2ZjJ6MHN6czJvMmMwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m5qJZ5HkW6aspbhzkt/giphy-downsized-large.gif"
        alt="Loading..."
        className="loader-image"
      />
    </div>
  );
};

export default Loader;
