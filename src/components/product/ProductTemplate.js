import React, { useState } from 'react';
import styles from '../../styles/ProductTemplate.module.css';
import DownArrow from '../../images/arrow.png';
import DOMPurify from 'dompurify';


const ProductTemplate = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [resourcesVisible, setResourcesVisible] = useState(false);
  const [specificationsVisible, setSpecificationsVisible] = useState(false);

  const handleCircleClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
    setResourcesVisible(false); // Close the resources section
  };

  const toggleSpecifications = () => {
    setSpecificationsVisible(!specificationsVisible);
    setDescriptionVisible(false); // Close the description section
    setResourcesVisible(false); // Close the resources section
  };

  const toggleResources = () => {
    setResourcesVisible(!resourcesVisible);
    setDescriptionVisible(false); // Close the description section
  };

  return (
    <div className={styles.container}>
      {product.isBestSeller && (
        <div className={styles.bestSellerSticker}>
          <span className={styles.bestSellerText}>Best Seller</span>
        </div>
      )}
  {/* <button onClick={() => handleEdit(product.id)}>Edit</button> */}

      <div className={styles.imageContainer}>
        <img
          src={product.images[currentImageIndex]}
          alt={`${product.title} Image ${currentImageIndex + 1}`}
          className={styles.image}
        />
        <div className={styles.navigationCircles}>
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`${styles.circle} ${
                index === currentImageIndex ? styles.activeCircle : ''
              }`}
              onClick={() => handleCircleClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.sku}>Item #: {product.sku}</p>
        <hr></hr>
        <div className={styles.info}>
          <p className={styles.sizeLabel}>Size:</p>
          <p className={styles.size}>{product.size}</p>
        </div>
        <hr></hr>
        {product.summary && (
            <ul className={styles.bulletPoints}>
              {product.summary.split('!').map((point, index) => (
                point.trim() && (
                  <li key={index} className={styles.bulletPoint}>{point.trim()}</li>
                )
              ))}
            </ul>
        )}
      </div>

      <div className={styles.descriptionDropdown}>
        <button
          className={`${styles.dropdownToggle} ${styles.thicktitle}`}
          onClick={toggleDescription}
        >
          Product Description
          <img
            src={DownArrow}
            alt="Arrow"
            className={`${styles.DownArrow} ${
              descriptionVisible ? styles.rotated : ''
            }`}
          />
        </button>
        {descriptionVisible && (
          <div
            className={styles.descriptionContent}
            style={{ height: 'auto', color: 'black' }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description, {
              }),
            }}
          />
        )}
      </div>

      <div className={styles.descriptionDropdown}>
  <button
    className={`${styles.dropdownToggle} ${styles.thicktitle}`}
    onClick={toggleSpecifications}
  >
    Specification Chart
    <img
      src={DownArrow}
      alt="Arrow"
      className={`${styles.DownArrow} ${
        specificationsVisible ? styles.rotated : ''
      }`}
    />
  </button>
  {specificationsVisible && product.specificationData && Array.isArray(product.specificationData) && (
    <div className={styles.descriptionContent}>
      <table className={styles.specificationTable}>
        <tbody>
          {product.specificationData.map((spec, index) => (
            <tr key={index}>
              <td className={styles.attributeCell}>{spec.attribute}</td>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>



      <div className={styles.descriptionDropdown}>
        <button
          className={`${styles.dropdownToggle} ${styles.thicktitle}`}
          onClick={toggleResources}
        >
          Resources and Downloads
          <img
            src={DownArrow}
            alt="Arrow"
            className={`${styles.DownArrow} ${
              resourcesVisible ? styles.rotated : ''
            }`}
          />
        </button>
        {resourcesVisible && (
          <div className={styles.descriptionContent}>
            {/* Safety Data Sheet Link */}
            {product.fileURL && (
              <div className={styles.fileContainer}>
                <a
                  href={product.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fileLink}
                >
                  Safety Data Sheet
                </a>
              </div>
            )}

            {product.links && (
              <div className={styles.fileContainer}>
                {product.links.map((link, index) => (
                  <div key={index} className={styles.namedLink}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.fileLink}
                    >
                      {link.name || `Link ${index + 1}`}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTemplate;
