import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import styles from '../../styles/Shoptest.module.css';

const formatCategoryTitle = (category) => {
  if (!category) return 'Shopping Items';

  // Replace camel case with spaces and capitalize first letter of each word
  return category.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, (c) => c.toUpperCase());
};

const LoadingIndicator = () => {
  return (
    <div className={styles.loadingIndicator}>
      <p>Loading...</p>
      {/* You can replace this with your own loading animation or component */}
    </div>
  );
};

const Shoptest = () => {
  const { category } = useParams();
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [sortingOption, setSortingOption] = useState('default'); // Default sorting option


  useEffect(() => {
    const fetchShoppingItems = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const firestore = getFirestore();
        let q;
        if (category === 'All Purpose Cleaner') {
          q = collection(firestore, 'AllPurposeCleaner');
        } else if (category === 'Disinfectants') {
          q = collection(firestore, 'Disinfectants');
        } else if (category === 'Degreasers') {
          q = collection(firestore, 'Degreasers');
        } else if (category === 'Restroom Care') {
          q = collection(firestore, 'RestroomCare');
        } else if (category === 'Floor Care') {
          q = collection(firestore, 'FloorCare');
        } else if (category === 'Carpet Care') {
          q = collection(firestore, 'CarpetCare');
        } else if (category === 'Misc. Cleaners') {
          q = collection(firestore, 'MiscCleaners');
        } else if (category === 'Pet Care') {
          q = collection(firestore, 'PetCare');
        } else if (category === 'Deodorizers') {
          q = collection(firestore, 'Deodorizers');
        } else if (category === 'Window Cleaners') {
          q = collection(firestore, 'WindowCleaners');

        } else if (category === 'Hand Soap') {
          q = collection(firestore, 'HandSoap');
        } else if (category === 'Lotion') {
          q = collection(firestore, 'Lotion');
        } else if (category === 'Shampoo') {
          q = collection(firestore, 'Shampoo');

        } else if (category === 'Brushes') {
          q = collection(firestore, 'CleaningTools');
        } else if (category === 'Mops & Mop Accessories') {
          q = collection(firestore, 'Mops');
        } else if (category === 'Buckets & Wringers') {
          q = collection(firestore, 'BucketsWringers');
        } else if (category === 'Window Tools') {
          q = collection(firestore, 'WindowTools');
        } else if (category === 'Trash Cans & Recycle Bins') {
          q = collection(firestore, 'Bins');
        } else if (category === 'Car Care') {
          q = collection(firestore, 'CarCare');
        } else if (category === 'Liners') {
          q = collection(firestore, 'Liners');
        } else if (category === 'Paper Products') {
          q = collection(firestore, 'Paper');
        } else if (category === 'Safety') {
          q = collection(firestore, 'Safety');
        } else if (category === 'Towels') {
          q = collection(firestore, 'Towels');
        } else if (category === 'Restroom Misc.') {
          q = collection(firestore, 'RestroomMisc');
        } else if (category === 'Misc. Items') {
          q = collection(firestore, 'MiscItems');

        } else if (category === 'Containers') {
          q = collection(firestore, 'Containers')
        } else if (category === 'Utensils') {
          q = collection(firestore, 'Utensils')
        } else if (category === 'Cups') {
          q = collection(firestore, 'Cups')
        } else if (category === 'Plates & Bowls') {
          q = collection(firestore, 'Plates')

        } else if (category === 'Other Machines') {
          q = collection(firestore, 'Backpack')
        } else if (category === 'Vacuum Cleaners') {
          q = collection(firestore, 'Vacuum')

        } else if (category === 'Show All Chemicals') {
          const collectionQueries = [
            query(collection(firestore, 'AllPurposeCleaner')),
            query(collection(firestore, 'Bleach')),
            query(collection(firestore, 'Disinfectants')),
            query(collection(firestore, 'Degreasers')),
            query(collection(firestore, 'RestroomCare')),
            query(collection(firestore, 'FloorCare')),
            query(collection(firestore, 'CarpetCare')),
            query(collection(firestore, 'PetCare')),
            query(collection(firestore, 'Deodorizers')),
            query(collection(firestore, 'MiscCleaners')),
            query(collection(firestore, 'WindowCleaners'))
          ];
    
          const querySnapshots = await Promise.all(collectionQueries.map(q => getDocs(q)));
          const combinedItems = querySnapshots
            .flatMap(querySnapshot =>
              querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .reduce((uniqueItems, currentItem) => {
              const duplicateItem = uniqueItems.find(
                item =>
                  item.title === currentItem.title &&
                  item.size === currentItem.size
              );
              if (!duplicateItem) {
                uniqueItems.push(currentItem);
              }
              return uniqueItems;
            }, []);
          setShoppingItems(combinedItems);
          console.log('Fetched Items:', combinedItems);
          return;
        } else if (category) {
          q = query(
            collection(firestore, 'Bleach'),
            where('category', '==', category)
          );
        } else {
          q = collection(firestore, 'Bleach');
        }
        console.log('Firestore Query:', q);
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setShoppingItems(items);
        setLoading(false); // Set loading to false after fetching data
        console.log('Fetched Items:', items);
      } catch (error) {
        console.error('Error fetching shopping items:', error);
        setLoading(false); // Set loading to false in case of an error
      }

      try {
        const firestore = getFirestore();
        let q;
         if (category === 'Show All Skin Care') {
          const collectionQueries = [
            query(collection(firestore, 'Lotion')),
            query(collection(firestore, 'HandSoap')),
            query(collection(firestore, 'Shampoo'))
          ];
    
          const querySnapshots = await Promise.all(collectionQueries.map(q => getDocs(q)));
          const combinedItems = querySnapshots
            .flatMap(querySnapshot =>
              querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .reduce((uniqueItems, currentItem) => {
              const duplicateItem = uniqueItems.find(
                item =>
                  item.title === currentItem.title &&
                  item.size === currentItem.size
              );
              if (!duplicateItem) {
                uniqueItems.push(currentItem);
              }
              return uniqueItems;
            }, []);
          setShoppingItems(combinedItems);
          console.log('Fetched Items:', combinedItems);
          return;
        } else if (category) {
          q = query(
            collection(firestore, 'Bleach'),
            where('category', '==', category)
          );
        } else {
          q = collection(firestore, 'Bleach');
        }
        console.log('Firestore Query:', q);
      } catch (error) {
        console.error('Error fetching shopping items:', error);
      }
      try {
        const firestore = getFirestore();
        let q;
         if (category === 'Show All Facilities & Grounds') {
          const collectionQueries = [
            query(collection(firestore, 'CleaningTools')),
            query(collection(firestore, 'BucketsWringers')),
            query(collection(firestore, 'Bins')),
            query(collection(firestore, 'CarCare')),
            query(collection(firestore, 'WindowTools')),
            query(collection(firestore, 'Liners')),
            query(collection(firestore, 'Paper')),
            query(collection(firestore, 'Safety')),
            query(collection(firestore, 'Towels')),
            query(collection(firestore, 'RestroomMisc')),
            query(collection(firestore, 'MiscItems'))
          ];
    
          const querySnapshots = await Promise.all(collectionQueries.map(q => getDocs(q)));
          const combinedItems = querySnapshots
            .flatMap(querySnapshot =>
              querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .reduce((uniqueItems, currentItem) => {
              const duplicateItem = uniqueItems.find(
                item =>
                  item.title === currentItem.title &&
                  item.size === currentItem.size
              );
              if (!duplicateItem) {
                uniqueItems.push(currentItem);
              }
              return uniqueItems;
            }, []);
          setShoppingItems(combinedItems);
          console.log('Fetched Items:', combinedItems);
          return;
        } else if (category) {
          q = query(
            collection(firestore, 'Bleach'),
            where('category', '==', category)
          );
        } else {
          q = collection(firestore, 'Bleach');
        }
        console.log('Firestore Query:', q);
      } catch (error) {
        console.error('Error fetching shopping items:', error);
      }

      try {
        const firestore = getFirestore();
        let q;
         if (category === 'Show All Food Service') {
          const collectionQueries = [
            query(collection(firestore, 'Containers')),
            query(collection(firestore, 'Utensils')),
            query(collection(firestore, 'Cups')),
            query(collection(firestore, 'Plates'))
          ];
    
          const querySnapshots = await Promise.all(collectionQueries.map(q => getDocs(q)));
          const combinedItems = querySnapshots
            .flatMap(querySnapshot =>
              querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .reduce((uniqueItems, currentItem) => {
              const duplicateItem = uniqueItems.find(
                item =>
                  item.title === currentItem.title &&
                  item.size === currentItem.size
              );
              if (!duplicateItem) {
                uniqueItems.push(currentItem);
              }
              return uniqueItems;
            }, []);
          setShoppingItems(combinedItems);
          console.log('Fetched Items:', combinedItems);
          return;

        } else if (category) {
          q = query(
            collection(firestore, 'Bleach'),
            where('category', '==', category)
          );
        } else {
          q = collection(firestore, 'Bleach');
        }
        console.log('Firestore Query:', q);
      } catch (error) {
        console.error('Error fetching shopping items:', error);
      }

      try {
        const firestore = getFirestore();
        let q;
         if (category === 'Show All Machines') {
          const collectionQueries = [
            query(collection(firestore, 'Vacuum')),
            query(collection(firestore, 'Backpack'))
          ];
    
          const querySnapshots = await Promise.all(collectionQueries.map(q => getDocs(q)));
          const combinedItems = querySnapshots
            .flatMap(querySnapshot =>
              querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
            .reduce((uniqueItems, currentItem) => {
              const duplicateItem = uniqueItems.find(
                item =>
                  item.title === currentItem.title &&
                  item.size === currentItem.size
              );
              if (!duplicateItem) {
                uniqueItems.push(currentItem);
              }
              return uniqueItems;
            }, []);
          setShoppingItems(combinedItems);
          console.log('Fetched Items:', combinedItems);
          return;

        } else if (category) {
          q = query(
            collection(firestore, 'Bleach'),
            where('category', '==', category)
          );
        } else {
          q = collection(firestore, 'Bleach');
        }
        console.log('Firestore Query:', q);
      } catch (error) {
        console.error('Error fetching shopping items:', error);
      }
      


    };
    fetchShoppingItems();
    setLoading(true); // Set loading to true when starting to fetch data




    
    // Update the document title based on the category
    document.title = category ? formatCategoryTitle(category) : 'Shopping Items';
  }, [category]);
  
  
  
  return (
    <div className={styles.background}>
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p className={styles.productCount}>
          <span className={styles.productCountNumber}>
            {shoppingItems.length}
          </span>{' '}
          {shoppingItems.length === 1 ? 'product' : 'products'} found for
        </p>
        <h1 className={styles.categoryTitle}>{formatCategoryTitle(category)}</h1>
      </div>
      <div className={styles.sortingContainer}>
        <select
          value={sortingOption}
          onChange={(e) => setSortingOption(e.target.value)}
          className={styles.sortingSelect}
        >
          <option value="default">Default Sorting</option>
          <option value="nameAsc">Sort by Name (A-Z)</option>
          <option value="nameDesc">Sort by Name (Z-A)</option>
          {/* Add more sorting options as needed */}
        </select>
      </div>
        <div className={styles.itemList}>
        {loading ? (
            <LoadingIndicator /> // Show loading indicator while fetching data
          ) : (
            shoppingItems
              .slice()
              .sort((a, b) => {
                if (sortingOption === 'nameAsc') {
                  return a.title.localeCompare(b.title);
                } else if (sortingOption === 'nameDesc') {
                  return b.title.localeCompare(a.title);
                }
                return 0;
              })
            .map((item) => (
            <div key={item.id} className={styles.itemBox}>
              {/* Pass the isBestSeller property to the Popular component */}
              {item.isBestSeller && (
                /* Conditionally render the sticker */
                <div className={styles.bestSellerSticker}>
                  <span className={styles.bestSellerText}>Best Seller</span>
                </div>
              )}
              {/* Use Link to navigate to the specific product page */}
              <Link to={`/product/${item.id}`} className={styles.itemLink}>
                {item.images && item.images.length > 0 && (
                  <img src={item.images[0]} alt={item.title} className={styles.smallImage} />
                )}
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <div className={styles.infoContainer}>

                <div className={styles.sizeBox}>Size: {item.size}</div>
                </div>
              </Link>
            </div>
            ))
          )}
        </div>
      </div>
      </div>
  );
};

export default Shoptest;