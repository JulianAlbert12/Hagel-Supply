import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ProductTemplate from './ProductTemplate';

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const firestore = getFirestore();
        const collectionsToCheck = [
          'popularProducts',
          'Bleach',
          'AllPurposeCleaner',
          'Disinfectants',
          'Degreasers',
          'RestroomCare',
          'FloorCare',
          'CarpetCare',
          'CarCare',
          'MiscCleaners',
          'PetCare',

          'HandSoap',
          'Lotion',

          'Towels',

          'Containers',
          'Utensils',
          'Cups',
          'Plates'
        ];

        for (const collectionName of collectionsToCheck) {
          const productRef = doc(firestore, collectionName, id);
          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            const productData = productSnapshot.data();
            setProduct(productData);
            return; // Stop further execution if found in any collection
          }
        }

        console.log('Product not found');
        setProduct(null); // Set the product to null if not found in any collection
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <ProductTemplate product={product} />
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDescription;
