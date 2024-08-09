import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-slidedown/lib/slidedown.css'

import logo from '../images/HagelNew.png';
import title from '../images/Hagel2.png';
import menuIcon from '../images/menu.png';
import DownArrow from '../images/arrow.png';
import BackIcon from '../images/BackImg.png';

import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [accountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [categoryButtonHovered, setCategoryButtonHovered] = useState(false);

  const [skinCareDropdownOpen, setSkinCareDropdownOpen] = useState(false);
  const [JanitorialDropdownOpen, setJanitorialDropdownOpen] = useState(false);
  const [FoodDropdownOpen, setFoodDropdownOpen] = useState(false);
  const [MachinesDropdownOpen, setMachinesDropdownOpen] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleMobileSubMenuClick = (submenuKey, path) => {
    setMobileMenuState((prevState) => ({
      ...prevState,
      [submenuKey]: false,
    }));

    navigate(path); // Change the route
  };

  const handleContactUs = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductsDropdownToggle = () => {
    setProductsDropdownOpen(!productsDropdownOpen);
    setSkinCareDropdownOpen(false); // Close the "Skin Care" dropdown when "Products" is opened
    setJanitorialDropdownOpen(false);
    setFoodDropdownOpen(false);
    setMachinesDropdownOpen(false);
  };

  const handleSkinCareDropdownToggle = () => {
    setSkinCareDropdownOpen(!skinCareDropdownOpen);
    setProductsDropdownOpen(false);
    setJanitorialDropdownOpen(false);
    setFoodDropdownOpen(false);
    setMachinesDropdownOpen(false);
  };

  const handleMachinesDropdownToggle = () => {
    setMachinesDropdownOpen(!MachinesDropdownOpen);
    setSkinCareDropdownOpen(false); 
    setFoodDropdownOpen(false);
    setProductsDropdownOpen(false);
    setJanitorialDropdownOpen(false);
  }; 

  const handleJanitorialDropdownToggle = () => {
    setJanitorialDropdownOpen(!JanitorialDropdownOpen);
    setProductsDropdownOpen(false);
    setSkinCareDropdownOpen(false); 
    setFoodDropdownOpen(false);
    setMachinesDropdownOpen(false);
  };

  const handleFoodDropdownToggle = () => {
    setFoodDropdownOpen(!FoodDropdownOpen);
    setProductsDropdownOpen(false);
    setSkinCareDropdownOpen(false);
    setJanitorialDropdownOpen(false);
    setMachinesDropdownOpen(false);
  };

  const handleMobileMenuToggle = () => {
    console.log('handleMobileMenuToggle called');
    setMobileMenuOpen((prev) => !prev);
  
    // If closing the mobile menu, reset all mobile submenu states
    if (!mobileMenuOpen) {
      setMobileMenuState({
        skinCareSubMenu: false,
        chemicalsSubMenu: false,
        FacGroundsSubMenu: false,
        FoodServiceSubMenu: false,
        MachinesSubMenu: false,
      });
    }
  };

  const [mobileMenuState, setMobileMenuState] = useState({
    skinCareSubMenu: false, // Submenu for "Skin Care"
    chemicalsSubMenu: false, // Submenu for "Chemicals"
    FacGroundsSubMenu: false, // Submenu for "Janitor Supplies"
    FoodServiceSubMenu: false, 
    MachinesSubMenu: false,
  });

  const openMobileSubMenu = (submenuKey) => {
    setMobileMenuState((prevState) => ({
      ...prevState,
      [submenuKey]: true,
      mobileMenuOpen: false, // Close the original menu
    }));
  };
  
  const goBackToMobileMenu = () => {
    setMobileMenuState({
      skinCareSubMenu: false,
      chemicalsSubMenu: false,
      FacGroundsSubMenu: false,
      FoodServiceSubMenu: false,
      MachinesSubMenu: false,
    });
    setMobileMenuOpen(true); // Open the main mobile menu
  };

const handleDropdownClose = (event) => {
    const isDropdownContent = event.target.closest('.dropdownContent');
    const isDropdownToggle = event.target.classList.contains('dropdownToggle');
    const isCategoryButton = event.target.classList.contains('categoryButton');
    const isJanitorialButton = event.target.classList.contains('janitorialButton');

    if (!isDropdownContent && !isDropdownToggle) {
      console.log('Closing mobileMenuOpen');
      setMobileMenuOpen(false);

      if (!isCategoryButton && !isJanitorialButton) {
        setCategoryButtonHovered(false);
      }
    }
  };

  

  const handleOutsideClick = (event) => {
    const isMobileMenu = event.target.closest('.mobile-menu');
    const isDropdownContent = event.target.closest('.dropdownContent');
    const isDropdownToggle = event.target.classList.contains('dropdownToggle');
    const isDropdownItemLink = event.target.classList.contains('dropdownItemLink');
    const isAccountButton = event.target.closest('.accountButton');
  
    const isCategoryButton = event.target.classList.contains('categoryButton');
    const isSubcategoryDropdown = event.target.closest('.subcategoryDropdown');
    const isProductsButton = event.target.classList.contains('productsButton');
    const isJanitorialButton = event.target.classList.contains('janitorialButton');
    const isMobileProductsDropdown = event.target.closest('.mobileProductsDropdown');
    
    if (
      mobileMenuOpen &&
      !isMobileMenu &&
      !isDropdownContent &&
      !isDropdownToggle &&
      !isAccountButton &&
      !isMobileProductsDropdown &&
      !isCategoryButton &&
      !isSubcategoryDropdown &&
      !isJanitorialButton &&
      !isDropdownItemLink &&
      !isProductsButton
    ) {
      console.log('Closing mobileMenuOpen');
      setMobileMenuOpen(false);
  
      if (!isCategoryButton && !isJanitorialButton) {
        setCategoryButtonHovered(false);
      }
    }
  
    if (productsDropdownOpen && !isDropdownContent && !isDropdownToggle && !event.target.closest('.productsDropdown')) {
      setProductsDropdownOpen(false);
    }
  
    if (accountDropdownOpen && !event.target.closest('.accountButton')) {
      console.log('Calling handleDropdownClose from handleOutsideClick');
      handleDropdownClose(event);
    }
  
    // Close other dropdowns based on their state
    if (skinCareDropdownOpen && !event.target.closest('.skinCareDropdown')) {
      setSkinCareDropdownOpen(false);
    }
  
    // Add similar conditions for other dropdowns
  };
  
  
  useEffect(() => {
    console.log('Adding event listener for handleOutsideClick');
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      console.log('Removing event listeners');
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [accountDropdownOpen, mobileMenuOpen, productsDropdownOpen, skinCareDropdownOpen]);


  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logoImage} />
          </div>
          <div className={styles.titleContainer}>
            <img src={title} alt="Title" className={styles.titleImage} />
          </div>
        </Link>
      </div>

      
      <li className={styles.navbarLink}>
        <span className={styles.productsTitle}>Products</span>
          <img
            src={DownArrow}
            alt="Arrow"
            className={`${styles.HeadDownArrow} ${
              productsDropdownOpen ? styles.rotated : ''
            }`}
          />
          <div
            className={`${styles.dropdownMenu} ${
              productsDropdownOpen ? styles.active : ''
            }`}
          >
            
            <button
              className={`${styles.categoryButton} ${
                skinCareDropdownOpen ? styles.active : ''
              }`}
              onClick={handleSkinCareDropdownToggle}
            >
              Skin Care
              <img
                src={DownArrow}
                alt="Arrow"
                className={`${styles.ProductHeadDownArrow} ${
                  skinCareDropdownOpen ? styles.rotated : ''
                }`}
              />

              {skinCareDropdownOpen && (
                <div className={styles.productsDropdown}>
                  <Link to="/shoptest/Show All Skin Care" className={styles.subcategoryLink} style={{ color: '#0668b3', fontWeight: '400'}}>
                    Show All Skin Care
                  </Link>
                  <Link to="/shoptest/Lotion" className={styles.subcategoryLink}>
                    Lotion
                  </Link>
                  <Link to="/shoptest/Shampoo" className={styles.subcategoryLink}>
                    Shampoo
                  </Link>
                  <Link to="/shoptest/Hand Soap" className={styles.subcategoryLink}>
                    Hand Soap
                  </Link>
                </div>
              )}
            </button>


            <button
              className={`${styles.categoryButton} ${
                productsDropdownOpen ? styles.active : ''
              }`}
              onClick={handleProductsDropdownToggle}
            >
              Chemicals
              <img
                src={DownArrow}
                alt="Arrow"
                className={`${styles.ProductHeadDownArrow} ${
                  productsDropdownOpen ? styles.rotated : ''
                }`}
              />
          
              {productsDropdownOpen && (
                <div className={styles.productsDropdown}>
                  <Link to="/shoptest/Show All Chemicals" className={styles.subcategoryLink} style={{ color: '#0668b3', fontWeight: '400'}}>
                    Show All Chemicals
                  </Link>
                  <Link to="/shoptest/All Purpose Cleaner" className={styles.subcategoryLink}>
                    All Purpose Cleaner
                  </Link>
                  <Link to="/shoptest/Bleach" className={styles.subcategoryLink}>
                    Bleach
                  </Link>
                  <Link to="/shoptest/Carpet Care" className={styles.subcategoryLink}>
                    Carpet Care
                  </Link>
                  <Link to="/shoptest/Degreasers" className={styles.subcategoryLink}>
                    Degreasers
                  </Link>
                  <Link to="/shoptest/Deodorizers" className={styles.subcategoryLink}>
                    Deodorizers
                  </Link>
                  <Link to="/shoptest/Disinfectants" className={styles.subcategoryLink}>
                    Disinfectants
                  </Link>
                  <Link to="/shoptest/Floor Care" className={styles.subcategoryLink}>
                    Floor Care
                  </Link>
                  <Link to="/shoptest/Misc. Cleaners" className={styles.subcategoryLink}>
                    Misc. Cleaners
                  </Link>
                  <Link to="/shoptest/Pet Care" className={styles.subcategoryLink}>
                    Pet Care
                  </Link>
                  <Link to="/shoptest/Restroom Care" className={styles.subcategoryLink}>
                    Restroom Care
                  </Link>
                  <Link to="/shoptest/Window Cleaners" className={styles.subcategoryLink}>
                    Window Cleaners
                  </Link>
                </div>
              )}
            </button>
            <button
              className={`${styles.categoryButton} ${
                JanitorialDropdownOpen ? styles.active : ''
              }`}
              onClick={handleJanitorialDropdownToggle}
            >
              Facilites & Grounds
              <img
                src={DownArrow}
                alt="Arrow"
                className={`${styles.ProductHeadDownArrow} ${
                  JanitorialDropdownOpen ? styles.rotated : ''
                }`}
              />
              {JanitorialDropdownOpen && (
                <div className={styles.productsDropdown}>
                  <Link to="/shoptest/Show All Facilities & Grounds" className={styles.subcategoryLink} style={{ color: '#0668b3', fontWeight: '400'}}>
                    Show All Facilities & Grounds
                  </Link>
                  <Link to="/shoptest/Brushes" className={styles.subcategoryLink}>
                    Brushes
                  </Link>
                  <Link to="/shoptest/Trash Cans & Recycle Bins" className={styles.subcategoryLink}>
                    Trash Cans & Recycle Bins
                  </Link>
                  <Link to="/shoptest/Mops & Mop Accessories" className={styles.subcategoryLink}>
                    Mops & Mop Accessories
                  </Link>
                  <Link to="/shoptest/Buckets & Wringers" className={styles.subcategoryLink}>
                    Buckets & Wringers
                  </Link>
                  <Link to="/shoptest/Car Care" className={styles.subcategoryLink}>
                    Car Care
                  </Link>
                  <Link to="/shoptest/Window Tools" className={styles.subcategoryLink}>
                    Window Tools
                  </Link>
                  <Link to="/shoptest/Window Tools" className={styles.subcategoryLink}>
                    Liners
                  </Link>
                  <Link to="/shoptest/Paper Products" className={styles.subcategoryLink}>
                    Paper Products
                  </Link>
                  <Link to="/shoptest/Safety" className={styles.subcategoryLink}>
                    Safety
                  </Link>
                  <Link to="/shoptest/Towels" className={styles.subcategoryLink}>
                    Towels
                  </Link>
                  <Link to="/shoptest/Restroom Misc." className={styles.subcategoryLink}>
                    Restroom Misc.
                  </Link>
                  <Link to="/shoptest/Misc. Items" className={styles.subcategoryLink}>
                    Misc. Items
                  </Link>
                </div>
              )}
            </button>

            <button
              className={`${styles.categoryButton} ${
                FoodDropdownOpen ? styles.active : ''
              }`}
              onClick={handleFoodDropdownToggle}
            >
              Food Service
              <img
                src={DownArrow}
                alt="Arrow"
                className={`${styles.ProductHeadDownArrow} ${
                  FoodDropdownOpen ? styles.rotated : ''
                }`}
              />
              {FoodDropdownOpen && (
                <div className={styles.productsDropdown}>
                  <Link to="/shoptest/Show All Food Service" className={styles.subcategoryLink} style={{ color: '#0668b3', fontWeight: '400'}}>
                    Show All Food Service
                  </Link>
                  <Link to="/shoptest/Containers" className={styles.subcategoryLink}>
                    Containers
                  </Link>
                  <Link to="/shoptest/Utensils" className={styles.subcategoryLink}>
                    Utensils
                  </Link>
                  <Link to="/shoptest/Cups" className={styles.subcategoryLink}>
                    Cups
                  </Link>
                  <Link to="/shoptest/Plates & Bowls" className={styles.subcategoryLink}>
                    Plates & Bowls
                  </Link>
                </div>
              )}
            </button>
            
            <button
              className={`${styles.categoryButton} ${
                MachinesDropdownOpen ? styles.active : ''
              }`}
              onClick={handleMachinesDropdownToggle}
            >
              Machines
              <img
                src={DownArrow}
                alt="Arrow"
                className={`${styles.ProductHeadDownArrow} ${
                  MachinesDropdownOpen ? styles.rotated : ''
                }`}
              />
              {MachinesDropdownOpen && (
                <div className={styles.productsDropdown}>
                  <Link to="/shoptest/Show All Machines" className={styles.subcategoryLink} style={{ color: '#0668b3', fontWeight: '400'}}>
                    Show All Machines
                  </Link>
                  <Link to="/shoptest/Vacuum Cleaners" className={styles.subcategoryLink}>
                    Vacuum Cleaners
                  </Link>
                  <Link to="/shoptest/Other Machines" className={styles.subcategoryLink}>
                    Other Machines
                  </Link>
                </div>
              )}
            </button>
          </div>
      </li> 
    <div className={styles.navbarActions}>
      <button className={styles.ContactButton} onClick={handleContactUs}>
          Contact Us
        </button>
      </div>

      <div className={styles.navbarActions}>
      <Link to="/about" className={styles.AboutButton}>
          About
        </Link>
      </div>



      <button
        className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.active : ''}`}
        onClick={handleMobileMenuToggle}
        style={{ outline: 'none' }}
      >
        <img src={menuIcon} alt="Menu" className={styles.menuIcon} />
      </button>


      {mobileMenuOpen && !mobileMenuState.skinCareSubMenu && !mobileMenuState.chemicalsSubMenu && !mobileMenuState.FacGroundsSubMenu && (
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''} ${mobileMenuOpen ? styles.slideInLeft : ''}`}>
        {/* Main mobile menu */}
          <>
            <div className={styles.mobileMenuItem}>
              <Link to="/about" className={`${styles.dropdownItemLink} ${styles.thickFont} ${styles.aboutUsLink}`}>
                About Us
              </Link>
              
              <button
                className={`${styles.dropdownItemLink} ${styles.thickFont}`}
                onClick={() => openMobileSubMenu('skinCareSubMenu')} // Open Skin Care submenu
              >
                Skin Care
              </button>
              <button
                className={`${styles.dropdownItemLink} ${styles.thickFont}`}
                onClick={() => openMobileSubMenu('chemicalsSubMenu')} // Open Chemicals submenu
              >
                Chemicals
              </button>
              <button
                className={`${styles.dropdownItemLink} ${styles.thickFont}`}
                onClick={() => openMobileSubMenu('FacGroundsSubMenu')} // Open Janitor Supplies submenu
              >
                Facilities & Grounds
              </button>
              <button
                className={`${styles.dropdownItemLink} ${styles.thickFont}`}
                onClick={() => openMobileSubMenu('FoodServiceSubMenu')} // Open Janitor Supplies submenu
              >
                Food Service
              </button>
              <button
                className={`${styles.dropdownItemLink} ${styles.thickFont}`}
                onClick={() => openMobileSubMenu('MachinesSubMenu')} // Open Janitor Supplies submenu
              >
                Machines
              </button>
            </div>
          </>
        </div>
      )}
      
      {/* Submenu for "Skin Care" */}
      {mobileMenuState.skinCareSubMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.thickFont}`}
              onClick={goBackToMobileMenu}
            >
              <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
            </button>
          </div>

          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('skinCareSubMenu', '/shoptest/Show All Skin Care')}
              style={{ color: '#0668b3', fontWeight: 'bold' }}
            >
              Show All Skin Care
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('skinCareSubMenu', '/shoptest/Lotion')}
            >
              Lotion
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('skinCareSubMenu', '/shoptest/Shampoo')}
            >
              Shampoo
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('skinCareSubMenu', '/shoptest/Hand Soap')}
            >
              Hand Soap
            </button>
          </div>
        </div>
      )}

    {/* Submenu for "Chemicals" */}
      {mobileMenuState.chemicalsSubMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.thickFont}`}
              onClick={goBackToMobileMenu}
            >
              <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
            </button>
          </div>

          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Show All Chemicals')}
              style={{ color: '#0668b3', fontWeight: 'bold' }}
            >
              Show All Chemicals
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/All Purpose Cleaner')}
            >
              All Purpose Cleaner
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/chemiclas/Bleach')}
            >
              Bleach
            </button>
            {/* Add more buttons for each subcategory in "Chemicals" */}
          </div>
        </div>
      )}

      {/* Submenu for "Chemicals" */}
      {mobileMenuState.chemicalsSubMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.thickFont}`}
              onClick={goBackToMobileMenu}
            >
              <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
            </button>
          </div>

          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Show All Chemicals')}
              style={{ color: '#0668b3', fontWeight: 'bold' }}
            >
              Show All Chemicals
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/All Purpose Cleaner')}
            >
              All Purpose Cleaner
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/chemiclas/Bleach')}
            >
              Bleach
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Carpet Care')}
            >
              Carpet Care
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Degreasers')}
            >
              Degreasers
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Deodorizers')}
            >
              Deodorizers
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Disinfectants')}
            >
              Disinfectants
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Floor Care')}
            >
              Floor Care
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Misc. Cleaners')}
            >
              Misc. Cleaners
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Pet Care')}
            >
              Pet Care
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Restroom Care')}
            >
              Restroom Care
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('chemicalsSubMenu', '/shoptest/Window Cleaners')}
            >
              Window Cleaners
            </button>
            {/* Add more subcategories for "Chemicals" */}
          </div>
        </div>
      )}


    {/* Submenu for "Facilities & Grounds" */}
    {mobileMenuState.FacGroundsSubMenu && (
      <div className={styles.mobileMenu}>
        <div className={styles.mobileMenuItem}>
          <button
            className={`${styles.dropdownItemLink} ${styles.thickFont}`}
            onClick={goBackToMobileMenu}
          >
            <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
          </button>
        </div>

        <div className={styles.mobileMenuItem}>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Show All Facilities & Grounds')}
            style={{ color: '#0668b3', fontWeight: 'bold' }}
          >
            Show All Facilities & Grounds
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Brushes')}
          >
            Brushes
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Trash Cans & Recycle Bins')}
          >
            Trash Cans & Recycle Bins
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Mops & Mop Accessories')}
          >
            Mops & Mop Accessories
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Buckets & Wringers')}
          >
            Buckets & Wringers
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Car Care')}
          >
            Car Care
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Window Tools')}
          >
            Window Tools
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Window Tools')}
          >
            Liners
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Paper Products')}
          >
            Paper Products
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Safety')}
          >
            Safety
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Towels')}
          >
            Towels
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Restroom Misc.')}
          >
            Restroom Misc.
          </button>
          <button
            className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
            onClick={() => handleMobileSubMenuClick('FacGroundsSubMenu', '/shoptest/Misc. Items')}
          >
            Misc. Items
          </button>
          {/* Add more subcategories for "Facilities & Grounds" */}
        </div>
      </div>
    )}


    {/* Submenu for "Food Service" */}
      {mobileMenuState.FoodServiceSubMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.thickFont}`}
              onClick={goBackToMobileMenu}
            >
              <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
            </button>
          </div>

          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('FoodServiceSubMenu', '/shoptest/Show All Food Service')}
              style={{ color: '#0668b3', fontWeight: 'bold' }}
            >
              Show All Food Service
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('FoodServiceSubMenu', '/shoptest/Containers')}
            >
              Containers
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('FoodServiceSubMenu', '/shoptest/Utensils')}
            >
              Utensils
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('FoodServiceSubMenu', '/shoptest/Cups')}
            >
              Cups
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('FoodServiceSubMenu', '/shoptest/Plates & Bowls')}
            >
              Plates & Bowls
            </button>
          </div>
        </div>
      )}

      {/* Submenu for "Machines" */}
      {mobileMenuState.MachinesSubMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.thickFont}`}
              onClick={goBackToMobileMenu}
            >
              <img src={BackIcon} alt="Back" className={styles.backImage} /> Back
            </button>
          </div>

          <div className={styles.mobileMenuItem}>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('MachinesSubMenu', '/shoptest/Show All Machines')}
              style={{ color: '#0668b3', fontWeight: 'bold' }}
            >
              Show All Machines
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('MachinesSubMenu', '/shoptest/Vacuum Cleaners')}
            >
              Vacuum Cleaners
            </button>
            <button
              className={`${styles.dropdownItemLink} ${styles.mobilesubcategoryLink}`}
              onClick={() => handleMobileSubMenuClick('MachinesSubMenu', '/shoptest/Other Machines')}
            >
              Other Machines
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
