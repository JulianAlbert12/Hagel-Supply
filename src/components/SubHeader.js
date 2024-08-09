// Import the image
import React, { useState } from 'react';
import styles from '../styles/SubHeader.module.css';
import plusIcon from '../images/plus.png'; // Replace with the correct path

const SubHeader = () => {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [rentalsOpen, setRentalsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const [spinDelivery, setSpinDelivery] = useState(false);
  const [spinRentals, setSpinRentals] = useState(false);
  const [spinService, setSpinService] = useState(false);

  const resetAllSpinStates = () => {
    setSpinDelivery(false);
    setSpinRentals(false);
    setSpinService(false);
  };

  const toggleSection = (section, setSpin) => {
    resetAllSpinStates(); // Reset all spin states

    switch (section) {
      case 'delivery':
        setDeliveryOpen(!deliveryOpen);
        setRentalsOpen(false);
        setServiceOpen(false);
        setSpin(!spinDelivery);
        break;
      case 'rentals':
        setRentalsOpen(!rentalsOpen);
        setDeliveryOpen(false);
        setServiceOpen(false);
        setSpin(!spinRentals);
        break;
      case 'service':
        setServiceOpen(!serviceOpen);
        setDeliveryOpen(false);
        setRentalsOpen(false);
        setSpin(!spinService);
        break;
      default:
        break;
    }
  };

  return (
    <header className={styles.sheader}>
      <div
        className={`${styles.header} ${deliveryOpen ? 'active' : ''}`}
        onClick={() => toggleSection('delivery', setSpinDelivery)}
      >
        <hr className={styles.hr}></hr>
        <span> Local Deliveries</span>
        <img
          className={`${styles['image-icon']} ${spinDelivery ? styles['spin'] : ''}`}
          src={plusIcon}
          alt="Plus Icon"
        />
      </div>
      {deliveryOpen && (
        <>
          <p>
            No matter the size of your order, large or small, we can deliver your order to you! Our crew travels about
            around the Bay Area, but special requests may also be accommodated. Give us a call today to see if we can
            deliver to your location at
          </p>
          <p className={styles.phoneNumber}>(415) 456-2955</p>
        </>
      )}

      <div
        className={`${styles.header} ${rentalsOpen ? 'active' : ''}`}
        onClick={() => toggleSection('rentals', setSpinRentals)}
      >
        <hr className={styles.hr}></hr>
        <span>We Offer Rentals</span>
        <img
          className={`${styles['image-icon']} ${spinRentals ? styles['spin'] : ''}`}
          src={plusIcon}
          alt="Plus Icon"
        />
      </div>
      {rentalsOpen && (
        <p>
          We understand that some cleaning projects require additional, heavy-duty equipment to thoroughly get the
          job done. At Hagel Supply, we offer equipment rental services to our customers for short term rental at a
          small fee. Contact us to inquire about rental prices and duration today!
        </p>
      )}

      <div
        className={`${styles.header} ${serviceOpen ? 'active' : ''}`}
        onClick={() => toggleSection('service', setSpinService)}
      >
        <hr className={styles.hr}></hr>
        <span>
          Expert Services
          <img
            className={`${styles['image-icon']} ${spinService ? styles['spin'] : ''}`}
            src={plusIcon}
            alt="Plus Icon"
          />
        </span>
      </div>
      {serviceOpen && (
          <>
          <p>
          Whether it's specialized equipment, thorough cleaning techniques, or prompt and reliable service, we go the
          extra mile to ensure your satisfaction. With years of experience in the industry, we take pride in delivering
          exceptional results that leave your space pristine.
          </p>
          <p className={styles.phoneNumber}>(415) 456-2955</p>
        </>
      )}
    </header>
  );
};

export default SubHeader;
