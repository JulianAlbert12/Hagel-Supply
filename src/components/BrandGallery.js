import React from 'react';
import styles from '../styles/BrandGallery.module.css';

// List of brand images (update the names as necessary)
const brandImages = [
  'serenade-logo.png',
  'royalpaper-logo.png',
  'maintex-logo.png',
  'kimclark.png',
  'exsl-logo.png',
  // Add more brands as needed
];

const BrandGallery = () => {
  return (
    <div className={styles.galleryContainer}>
      {brandImages.map((image, index) => (
        <div className={styles.brandItem} key={index}>
          <img
            src={require(`../images/Brands/${image}`)} // Dynamically require the image
            alt={`Brand ${index + 1}`}
            className={styles.brandImage}
          />
        </div>
      ))}
    </div>
  );
};

export default BrandGallery;
