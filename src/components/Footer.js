import React from 'react';
import styles from '../styles/Footer.module.css';
import ClockIcon from '../images/Clock.png';
import LocationIcon from '../images/Location.png';
import PhoneIcon from '../images/Phone.png';
import InstagramIcon from '../images/InstagramIcon.png';
import FacebookIcon from '../images/FacebookIcon.png';
import HagelLogo from '../images/HagelNew.png'; 
import HagelTitle from '../images/Hagel2.png'; 
import EmailIcon from '../images/email.png'; 

// Footer component

const Footer = () => {
  return (
    <footer id="footer">
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.column}>
          <img src={HagelLogo} alt="Hagel Logo" className={styles.companyLogo} /> {/* Add company logo */}
              <img src={HagelTitle} alt="Hagel2" className={styles.companyTitle} /> {/* Add company logo */}
            <div className={styles.infoContainer}>
              <div className={styles.infoItem}>
                <img src={LocationIcon} alt="Location" className={styles.infoIcon} />
                <p className={styles.infoText}>80 Belvedere St, San Rafael, CA</p>
              </div>
              <div className={styles.infoItem}>
                <img src={PhoneIcon} alt="Phone" className={styles.infoIcon} />
                <p className={styles.infoText}>415-456-2955</p>
              </div>
              <div className={styles.infoItem}>
                <img src={EmailIcon} alt="Clock" className={styles.infoIcon} />
                <p className={styles.infoText}>service@hagelsupply.com</p>
              </div>
              <div className={styles.infoItem}>
                <img src={ClockIcon} alt="Clock" className={styles.infoIcon} />
                <p className={styles.infoText}>Monday-Friday: 8am - 4:30pm</p>
              </div>
              <div className={styles.socialIcons}>
              <a href="https:/www.instagram.com/hagel_supply/">
                <img src={InstagramIcon} alt="Instagram" className={styles.icon} />
              </a>
              <a href="https:/www.facebook.com/HagelSupplyCo/">
                <img src={FacebookIcon} alt="Facebook" className={styles.icon} />
              </a>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}> We are located at</h3>
            <div className={styles.mapContainer}>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.5909231565406!2d-122.50741038825846!3d37.96333667182136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a3aeadcf01d%3A0x412f8f5e3febf08!2s80%20Belvedere%20St%2C%20San%20Rafael%2C%20CA%2094901!5e0!3m2!1sen!2sus!4v1687796161776!5m2!1sen!2sus"
                width="350"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </footer>

    </footer>
  );
};

export default Footer;
