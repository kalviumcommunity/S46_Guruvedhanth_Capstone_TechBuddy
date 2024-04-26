import React, { useState } from 'react';
import image1 from '../assets/userinfo-1.png';
import image2 from '../assets/userinfo-2.png';

function AuthComponent() {
  const [currentImage, setCurrentImage] = useState(image1);

  // Function to toggle between images
  const toggleImage = () => {
    setCurrentImage(currentImage === image1 ? image2 : image1);
  };

  // Changing image every 2 seconds
  setTimeout(toggleImage, 2000);

  return (
    <div>
      <img src={currentImage} alt="" className='h-96'/>
    </div>
  );
}

export default AuthComponent;
