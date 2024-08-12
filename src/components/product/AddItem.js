import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import styles from '../../styles/AddItemForm.module.css';
import ProductTemplate from './ProductTemplate';
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; 

const preDefinedAttributes = [
  { attribute: 'Brand', value: '' },
  { attribute: 'Scent', value: '' },
  { attribute: 'Size (container)', value: '' },
  { attribute: 'Application', value: '' },
  { attribute: 'Physical Form', value: '' },
  { attribute: 'Compliance Standard', value: '' },
];

const AddItemForm = ({ addPopularProduct }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [sku, setSku] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [additionalCategories, setAdditionalCategories] = useState('');
  const [specificationData, setSpecificationData] = useState(preDefinedAttributes);
  const [isPopular, setIsPopular] = useState(false); 
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [links, setLinks] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      // Set the state based on the editingProduct data
      setTitle(editingProduct.title);
      setSku(editingProduct.sku);
      setSize(editingProduct.size);
      setDescription(editingProduct.description);
      // ...set other fields
    }
  }, [editingProduct]);


  const handleImageChange = (event) => {
    const files = event.target.files;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages((prevImages) => [...prevImages, reader.result]);
      }
    };

    for (const file of files) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  /*
    const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  */



  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSkuChange = (event) => {
    setSku(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleSpecificationDataChange = (index, key, value) => {
    const updatedSpecificationData = [...specificationData];
    updatedSpecificationData[index][key] = value;
    setSpecificationData(updatedSpecificationData);
  };

  const handleAddSpecificationRow = () => {
    setSpecificationData([...specificationData, { attribute: '', value: '' }]);
  };  

  const handleRemoveSpecificationRow = (index) => {
    const updatedSpecificationData = [...specificationData];
    updatedSpecificationData.splice(index, 1);
    setSpecificationData(updatedSpecificationData);
  };  
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAdditionalCategoriesChange = (event) => {
    setAdditionalCategories(event.target.value);
  };

  const handlePopularChange = (event) => {
    setIsPopular(event.target.checked);
  };

  const handleBestSellerChange = (event) => {
    setIsBestSeller(event.target.checked);
  };

  const handleAddLink = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const handleLinkChange = (index, key, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][key] = value;
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newItem = {
      title: title,
      sku: sku,
      images: images,
      size: size,
      fileURL: file ? URL.createObjectURL(file) : null,
      description: description,
      summary: summary,
      isBestSeller: isBestSeller,
      additionalCategories: additionalCategories,
      category: category,
      links: links,
      specificationData: specificationData,
    };
  
    try {
      let collectionRef;
  
      if (editingProduct) {
        // Update the existing item's data
        const updatedItem = {
          ...editingProduct,
          ...newItem,
        };
  
        // Update the item in the firestore collection using its document ID
        await updateDoc(doc(firestore, category, editingProduct.id), updatedItem);
  
        // Handle popular product updates if needed
  
        // Clear the editing mode after successful update
        setEditingProduct(null);
      } else {
        // Add the new item to the selected category
        if (category) {
          collectionRef = collection(firestore, category);
        }
  
        // If marked as popular, also add to popularProducts collection
        if (isPopular) {
          collectionRef = collection(firestore, 'popularProducts');
  
          // Add to popular products state
          addPopularProduct({
            name: title,
            images: images,
          });
        }
  
        // Add the item to additional categories
        if (additionalCategories) {
          const additionalCategoriesArray = additionalCategories.split(',').map((cat) => cat.trim());
  
          for (const additionalCategory of additionalCategoriesArray) {
            // Add item to existing category or create new category if it doesn't exist
            collectionRef = collection(firestore, additionalCategory);
            const categorySnapshot = await getDocs(collectionRef);
  
            if (categorySnapshot.size === 0) {
              // Create the category if it doesn't exist
              await addDoc(collection(firestore, 'categories'), {
                name: additionalCategory,
              });
            }
  
            // Add the item to the category
            await addDoc(collectionRef, newItem);
          }
        }
  
        // Reset form fields
        setImages([]);
        setDescription('');
        setSize('');
        setTitle('');
        setFile(null);
        setSku('');
        setSummary('');
        setCategory('');
        setAdditionalCategories('');
        setIsPopular(false);
      }
    } catch (error) {
      console.error('Error adding/updating item: ', error);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Add Item</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} className={styles.widerInput} />
          </div>

          <div className={styles.formGroupContainer}>
            <div className={styles.formGroup}>
              <label>Part Number:</label>
              <input type="text" value={sku} onChange={handleSkuChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Size:</label>
              <input type="text" value={size} onChange={handleSizeChange} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Images:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" multiple />
            <div className={styles.imagePreviewContainer}>
              {images.map((img, index) => (
                <div key={index} className={styles.imagePreviewWrapper}>
                    <img src={img} alt={`Product Preview ${index + 1}`} className={styles.imagePreview} />
                  <button
                    type="button"
                    className={styles.removeImageButton}
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Category:</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              <option value="AllPurposeCleaner">All Purpose Cleaner</option>
              <option value="Bleach">Bleach</option>
              <option value="CarpetCare">Carpet Care</option>
              <option value="CarCare">Car Care</option>
              <option value="Degreasers">Degreasers</option>
              <option value="Deodorizers">Deodorizers</option>
              <option value="Disinfectants">Disinfectants</option>
              <option value="FloorCare">Floor Care</option>
              <option value="MiscCleaners">Misc. Cleaners</option>
              <option value="PetCare">Pet Care</option>
              <option value="RestroomCare">Restroom Care</option>
              <option value="WindowCleaners">Window Cleaners</option>

              <option value="HandSoap">Hand Soap</option>
              <option value="Lotion">Lotion</option>

              <option value="Mops">Mops & Mop Accessories</option>
              <option value="Bins">Trash Cans & Recycle Bins</option>
              <option value="CleaningTools">Brushes</option>
              <option value="BucketsWringers">Buckets & Wringers</option>

              <option value="WindowTools">Window Tools</option>
              <option value="Paper">Paper Products</option>
              <option value="Safety">Safety</option>
              <option value="Towels">Towels</option>
              <option value="RestroomMisc">Restroom Misc.</option>
              <option value="MiscItems">Misc. Items</option>


              <option value="Containers">Containers</option>
              <option value="Utensils">Utensils</option>
              <option value="Cups">Cups</option>
              <option value="Plates">Plates & Bowls</option>

              <option value="Backpack">Spray Backpack</option>
              <option value="Vacuum">Vacuum Cleaners</option>



            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Additional Categories:</label>
            <input
              type="text"
              placeholder="Enter additional categories separated by commas"
              value={additionalCategories}
              onChange={handleAdditionalCategoriesChange}
            />
        </div>

          <div className={styles.formGroup}>
            <label>Summary:</label>
            <p>bullet points only (use "!" to end line)</p>
            <textarea value={summary} onChange={handleSummaryChange} className={styles.bigInput} />
          </div>

          {
            /*
            <div className={styles.formGroup}>
                <label>Description:</label>
                  <div className={styles.TextContainer}>
                  <ReactQuill
                    value={description}
                    onChange={handleDescriptionChange}
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        [{ align: [] }],
                      ],
                    }}
                    theme="snow" 
                  />  
                </div>
            </div>
            */
          }


          <div className={styles.formGroup}>
            <label>Specification Chart:</label>
            {specificationData.map((spec, index) => (
              <div key={index} className={styles.specificationRow}>
                <input
                  type="text"
                  placeholder="Attribute"
                  value={spec.attribute}
                  onChange={(e) =>
                    handleSpecificationDataChange(index, 'attribute', e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationDataChange(index, 'value', e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpecificationRow(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSpecificationRow}
            >
              Add Row
            </button>
          </div>


          <div className={styles.formGroupContainer}>
            <div className={styles.formGroup}>
              <label>Popular:</label>
              <input type="checkbox" checked={isPopular} onChange={handlePopularChange} />
            </div>

            <div className={styles.formGroup}>
              <label>Best Seller:</label>
              <input type="checkbox" checked={isBestSeller} onChange={handleBestSellerChange} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Safety Data Sheet</label>
            <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
            {file && <p className={styles.fileName}>{file.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Additional Links:</label>
            {links.map((link, index) => (
              <div key={index} className={styles.linkGroup}>
                <input
                  type="text"
                  placeholder="Link Name"
                  value={link.name}
                  onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                />
                <button type="button" onClick={() => handleRemoveLink(index)}>
                  X
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddLink}>
              Add Link
            </button>
          </div>

          <button type="submit" className={styles.AddItemButton}>
            Add Item
          </button>
        </form>
      </div>

      <div className={styles.previewContainer} style={{ width: '10% !important' }}>
  <h2 className={styles.previewTitle}>Preview:</h2>
  <div className={styles.productTemplateContainer}>
    <ProductTemplate
      product={{
        images,
        title,
        category,
        additionalCategories,
        size,
        description,
        fileURL: file ? URL.createObjectURL(file) : null,
        sku,
        summary,
        isBestSeller,
        links: links,
        specificationData: specificationData,
      }}
      setEditingProduct={setEditingProduct}
    />
  </div>
</div>




    </div>
  );
};

export default AddItemForm;
