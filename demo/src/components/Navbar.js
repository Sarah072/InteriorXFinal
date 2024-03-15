import './Navbar.css';
import React, { useState } from 'react';
import InteriorXLogo from './images/InteriorXLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

function Navbar2() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const [showDropdown2, setShowDropdown2] = useState(false);
    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    };

    
    const [showDropdown3, setShowDropdown3] = useState(false);
    
    const toggleDropdown3 = () => {
        setShowDropdown3(!showDropdown3);
    };


    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('projectData_')) {
                localStorage.removeItem(key);
            }
        });

        navigate('/');
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    
        if (value === '') {
            // Clear search results when search term is empty
            setSearchResults([]);
            return;
        }
    
        // Filter the pages based on the search term
        const filteredPages = pages.filter(page =>
            page.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredPages);
    };
    

    const handleCloseDrawer = () => {
        setMenuOpen(false);
    };

    const handlePageClick = (route) => {
        // Redirect to the selected page
        navigate(route);
        // Close the menu
        setMenuOpen(false);
    };




    const pages = [
        { route: '/Req', title: 'Home' },
        { route: '/EducationInspiration', title: 'Education and Inspiration' },
        { route: '/Community', title: 'Community' },
        { route: '/EducationInspirationNews', title: 'Industry News and Updates' },
        { route: '/DesignInspirationIdeas', title: 'Design Ideas' },
        { route: '/DesignTrendsArticle', title: 'Design Articles' },
        { route: '/InteriorDesignPins', title: 'Trends and Inspiration Boards' },
        { route: '/DomesticGasBill', title: 'Domestic Gas Bill Calculator' },
        { route: '/ParentComponent', title: 'Electricity Bill Calculator' },
        { route: '/FurnitureEstimator', title: 'Furniture Cost Prediction' },
        { route: '/Professional', title: 'Chat with Professionals' },
        { route: '/UserRolesPage', title: 'Collaboration' },
        { route: '/LocalSuppliers', title: 'Find Local Sustainable Suppliers' },
        { route: '/FavouriteItems', title: 'Wishlist and Favourites' },
        { route: '/Req', title: 'Contact Us' },
        { route: '/ProfileSetting', title: 'Profile Settings' },
    ];
    return (
      <nav className="navbar2 navbar-white bg-white" >
      <div className="logo2">
          <img src={InteriorXLogo} alt="Logo" />
      </div>
      <div></div>
      <div></div> <div></div> <div></div> <div></div> <div></div> <div></div>
      
      <div className='contact-info'>
      <div style={{marginTop: '20px', marginRight: '20px'}}><FaPhone /> (+92) 315-1559625</div>
      <div style={{marginTop: '20px'}}><FaEnvelope /> sarahnasir555@gmail.com</div>
      </div>
      <div className="search-box" style={{ position: 'relative' }}>
    <div className="search-icon">
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M23 21.2L17.2 15.4C18.8333 13.3 19.6667 10.7 19.6667 8C19.6667 3.6 15.0667 0 10.6667 0C6.26667 0 1.66667 3.6 1.66667 8C1.66667 12.4 6.26667 16 10.6667 16C13.4 16 15.8667 14.6 17.6667 12.8L23.4 18.6L23 21.2ZM10.6667 14C6.86667 14 3.66667 10.8 3.66667 7C3.66667 3.2 6.86667 0 10.6667 0C14.4667 0 17.6667 3.2 17.6667 7C17.6667 10.8 14.4667 14 10.6667 14Z"
                fill="black"
            />
        </svg>
    </div>
    <input
        type="text"
        className="form-controlSearch"
        style={{width: '270px'}}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
    />
    {searchResults.length > 0 && (
        <div className="search-results">
            {searchResults.map(page => (
                <div key={page.route} onClick={() => handlePageClick(page.route)}>
                    {page.title}
                </div>
            ))}
        </div>
    )}
</div>

      <div className="menu-icon" onClick={handleMenuToggle}>
          <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="2.5" width="25" height="3" fill="black" />
              <rect y="7.5" width="25" height="3" fill="black" />
              <rect y="12.5" width="25" height="3" fill="black" />
          </svg>
      </div>

                <div className={`drawer ${menuOpen ? 'open' : ''}`}>
                    <button className="close-btn" onClick={handleCloseDrawer}>
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.1429 6.85718L6.85709 19.1429M6.85709 6.85718L19.1429 19.1429"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <ul className="drawer-menu">
                        <li>
                            <Link to="/Req" onClick={handleCloseDrawer}>
                                Home
                            </Link>
                        </li>
                        <li>
                        <Link onClick={toggleDropdown2} style={{ cursor: 'pointer' }}>
                        Education & Inspiration
                    <span>{showDropdown2 ? '▼' : '►'}</span>
                </Link>
                            
                        </li>
                        {showDropdown2 && (
                        <ul>
        <li className='innerLinks'>
            <Link to="/Community" onClick={handleCloseDrawer}>
                Community
            </Link>
        </li>
        <li className='innerLinks'>
            <Link to="/EducationInspirationNews" onClick={handleCloseDrawer}>
            Industry News and Updates
            </Link>
        </li>
        <li className='innerLinks'>
            <Link to="/DesignInspirationIdeas" onClick={handleCloseDrawer}>
            Design Ideas
            </Link>
        </li>
        <li className='innerLinks'>
            <Link to="/DesignTrendsArticle" onClick={handleCloseDrawer}>
            Design Articles
            </Link>
        </li>
                        <li>
                            <Link to="/InteriorDesignPins" onClick={handleCloseDrawer}>
                                Trends
                            </Link>
                        </li>
       
    </ul>
      )}
    <li>
                <Link onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    Bill Calculator
                    <span>{showDropdown ? '▼' : '►'}</span>
                </Link>
                {showDropdown && (
                    <ul>
                       <li className='innerLinks'>
                            <Link to="/DomesticGasBill" onClick={handleCloseDrawer}>
                                Domestic Gas Bill
                            </Link>
                        </li>
                        <li className='innerLinks'>
                            <Link to="/ParentComponent" onClick={handleCloseDrawer}>
                                Electricity Bill
                            </Link>
                        </li>
                    </ul>
                )}
            </li>
                        <li>
                            <Link to="/FurnitureEstimator" onClick={handleCloseDrawer}>
                                FurniCalc AI
                            </Link>
                        </li>
                        <li>
                            <Link to="/Professional" onClick={handleCloseDrawer}>
                                Chat with Professionals
                            </Link>
                        </li>
                        <li>
                            <Link to="/LocalSuppliers" onClick={handleCloseDrawer}>
                                Find Local Suppliers
                            </Link>
                        </li>
                    
                        <li>
                            <Link to="/FavouriteItems" onClick={handleCloseDrawer}>
                                Wishlist
                            </Link>
                        </li>
                        <li>
                            <Link to="/ContactForm" onClick={handleCloseDrawer}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                           

                            <Link onClick={toggleDropdown3} style={{ cursor: 'pointer' }}>
                            Collaboration
                    <span>{showDropdown3 ? '▼' : '►'}</span>
                </Link>
                            
                {showDropdown3 && (
                    <ul>
                          <li className='innerLinks'>
                            <Link to="/UserRolesPage" onClick={handleCloseDrawer}>
                            Start Project in Collaboration
                            </Link>
                        </li>

                       <li className='innerLinks'>
                            <Link to="/ColTaskDisplay" onClick={handleCloseDrawer}>
                            AssignedTasks
                            </Link>
                        </li>

                       
                    </ul>
                )}


             
            </li>
                        
                        <li>
                            <Link to="/ProfileSetting" onClick={handleCloseDrawer}>
                                Profile
                            </Link>
                        </li>
                        <li className="logoutlink">
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
          
        </nav>
    );
}

export default Navbar2;
