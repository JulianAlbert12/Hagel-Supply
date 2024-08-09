import React, { useState, useEffect } from 'react';
import styles from '../styles/ImageSlideshow.module.css';
import logo from '../images/Hagel2.png'; // Update this path to match your logo image's path

const ImageSlideshowWithText = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Interval for slideshow

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <img src={logo} alt="Hagel Supply Logo" style={{ maxWidth: '60%', height: 'auto' }} />
        <h3>80 Belvedere St, San Rafael</h3>
        <p className={styles.pcolor}>
          Located in San Rafael, CA, is your top local janitorial supply store! We carry a dynamic selection of cleaning products ready to use in your home, office, or warehouse. Products can be purchased directly in our store, with delivery options.
        </p>
      </div>
      <div className={styles.slideshowContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slideshow ${index + 1}`}
            className={`${styles.slideshowImage} ${currentIndex === index ? styles.active : ''}`}
            style={{ height: '600px' }} // Set the desired height here
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshowWithText;
