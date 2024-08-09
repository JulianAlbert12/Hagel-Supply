import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const EditItemForm = () => {
  const { productId } = useParams();
  const [setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data from Firestore based on the document ID (productId)
    const fetchProductData = async () => {
      try {
        const productRef = doc(getFirestore(), 'products', productId); // Use Firestore functions
        const productSnapshot = await getDoc(productRef); // Use Firestore functions
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setEditingProduct(productData);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  // ... rest of your editing form logic
};

export default EditItemForm;
