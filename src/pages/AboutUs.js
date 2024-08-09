import React from 'react';
import styles from '../styles/AboutUs.module.css';
import image from '../images/about-image.jpg';

const AboutUs = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.subtitle}>Over Five Decades Of Cleanliness</h1>
            <p className={styles.description}>Hagel Supply Co. has been family owned and operated for over 50 years. Founded 
            by Gunther Hagel in 1961, we have been providing the community of Marin County with all of your maintenance service 
            and cleaning supply needs. We offer janitorial supplies needed to run your business, as well as a laundry 
            list of household cleaning products. </p>

            <h1 className={styles.subtitle}>Local and reliable service</h1>
            <p className={styles.description}>
              With over 30 years in the local community, we are able to provide you with the tools you need to 
              tackle today's toughest cleaning challenges.</p>

            <h1 className={styles.subtitle}>Trust in a family business</h1>
            <p className={styles.description}>Our mission is to provide a service to the community that enables friends and families
              to maintain a clean and sustainable home and workplace using products and services provided by our knowledgeable staff.</p>
          </div>
          <div className={styles.imageContainer}>
            <img src={image} alt="about" className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
