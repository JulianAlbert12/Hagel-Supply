import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
//import 'react-quill/dist/quill.snow.css';

import Navbar from './components/Navbar';
import './styles/globalStyles.css';
import SubHeader from './components/SubHeader';
import ImageSlideshow from './components/ImageSlideshow';
import BrandGallery from './components/BrandGallery';
import Popular from './components/Popular';
import Footer from './components/Footer';
import Help from './components/Help';
import AddItem from './components/product/AddItem';
import EditItemForm from './components/product/EditItemForm';

import UpdateMessage from './components/UpdateMessage';
import AboutUs from './pages/AboutUs';
import Shoptest from './pages/shop/shoptest'

import ProductDescription from './components/product/ProductDescription';

import SerenadeImg from './images/Serenade.jpg';
import image1 from './images/image1.jpg';
import image2 from './images/Store.jpg';
import image3 from './images/Storee.jpg';

import './fonts/RetroNewVersion.otf';

import BrandStrip from './components/BrandStrip';
import L1 from './images/Brands/serenade-logo.png';
import L2 from './images/Brands/chase-logo.png';
import L3 from './images/Brands/kimclark.png';
import L4 from './images/Brands/maintex-logo.png';
import L5 from './images/Brands/exsl-logo.png';
import L6 from './images/Brands/royalpaper-logo.png';



function App() {
  const images = [image2, image3, image1, SerenadeImg];
  const brands = [L1 , L2, L3, L4, L5, L6];

  // Add the state for popular products
  const [setPopularProducts] = useState([]);

  // Function to add new products to popular products
  const addPopularProduct = (newProduct) => {
    setPopularProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="App">
      <div className="container">
      <Navbar />
      <Routes>
        <Route path="/about" element={
          <>
            <AboutUs />
            <SubHeader />
            <Footer />
          </>
        } />

        <Route path="/shoptest/:category" element={
          <>
            <Shoptest />
            <Help/>
            <SubHeader />
            <Footer />
          </>
        } />

        <Route path="/manage" element={
          <>
            <AddItem addPopularProduct={addPopularProduct} />
          </>
        } />

       <Route path="/edit/:productId" element={
        <EditItemForm addPopularProduct={addPopularProduct} />} 
       />

        <Route path="/product/:id" element={
          <>
            <ProductDescription />  
            <Help/>
            <h2>Suggested Products</h2>
            <Popular addPopularProduct={addPopularProduct} />
            <SubHeader /> 
            <Footer />
          </>
        }/>

    <Route path="/Hagel-Supply" element={
          <>
            <UpdateMessage />
            <ImageSlideshow images={images} />
            <BrandStrip brandLogos={brands} />
            <h2>Featured Brands</h2>
            <BrandGallery />
            <h2>Popular Products</h2>
            <Popular addPopularProduct={addPopularProduct} />
            <SubHeader />
            <Footer />
          </>
        } />


      </Routes>
      </div>
    </div>
  );
}

export default App;
