import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Popular.module.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Popular = ({ addPopularProduct }) => {
  // Add the state for popular products
  const [popularProducts, setPopularProducts] = useState([]);

  // Function to get a specific attribute from the specificationData object
  const getItemAttribute = (item, attributeName) => {
    if (Array.isArray(item.specificationData)) {
      const attributeObj = item.specificationData.find(spec => spec.attribute === attributeName);
      return attributeObj ? attributeObj.value : 'N/A';
    }
    return 'N/A'; // Handle case where specificationData is not an array
  };

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const firestore = getFirestore();
        const popularProductsRef = collection(firestore, 'popularProducts');
        const popularProductsSnapshot = await getDocs(popularProductsRef);

        const products = popularProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPopularProducts(products);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

return (
  <div className={styles.background}>
      <div className={styles.popular}>
        <div className={styles.productList}>
          {popularProducts.length > 0 ? (
            popularProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className={styles.productLink}
              >
                <div className={styles.product}>
                  {product.isBestSeller && (
                    <div className={styles.bestSellerSticker}>
                      <span className={styles.bestSellerText}>Best</span>
                    </div>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <h3 className={styles.title}>{product.title}</h3>
                  <div className={styles.itemInfo}>Scent: {getItemAttribute(product, 'Scent')}</div>
                  <div className={styles.sizeBox}>Size: {product.size}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>No popular products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popular;
