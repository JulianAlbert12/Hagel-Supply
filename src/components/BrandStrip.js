import React from 'react';
import PropTypes from 'prop-types';
import NewsImage from '../images/header-3.png';
import styles from '../styles/BrandStrip.module.css';

const BrandStrip = ({ brandLogos }) => {
  return (
    <div className={styles.brandStripContainer}>
      <div className={styles.textContainer}>
        <p className={styles.retroHeading}>COMPLETE SUPPLY NEEDS</p>
        <p className={styles.description}>
          Since 1961, Hagel Supply Co. has provided the community of Marin County
          with all your maintenance service and cleaning supply needs. We offer
          janitorial supplies needed to run your business, as well as a laundry
          list of household cleaning products.
        </p>
      </div>
      <img src={NewsImage} alt="News" className={styles.newsImage} />
      {/* Uncomment the following Link component if needed */}
      {/* <Link to="/manage" className={styles.addButton}>
        Add Item
      </Link> */}
    </div>
  );
};

BrandStrip.propTypes = {
  brandLogos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BrandStrip;
