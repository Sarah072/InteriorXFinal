import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const ArticleLinks = () => {
  const [activeLink, setActiveLink] = useState('');
 
  
  const linkStyle = {
    display: 'inline-block',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    backgroundColor: '#eaeaea', 
    textDecoration: 'none',
    color: '#333', 
  };

  const activeStyle = {
    backgroundColor: '#ffcc00', 
    color: '#fff', 
  };

  return (
    <div className="horizontal-links-section" style={{textAlign: 'center'}}>
     <Link
        style={activeLink === 'link1' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link1')}
        to="/DesignTrendsArticle"
      >
        Design Trends
      </Link>

      <Link
        style={activeLink === 'link2' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link2')}
        to="/Article2"
      >
        Room Makeovers
      </Link>
      
        <Link
        style={activeLink === 'link3' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link3')}
        to="/Article3"
      >
        Color Psychology
      </Link>
      <Link
        style={activeLink === 'link4' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link4')}
        to="/Article4"
      >
      Furniture Selection and Arrangement
      </Link>
      <Link
       style={activeLink === 'link5' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link5')}
        to="/Article5"
      >
      Small Space Design
      </Link>
      <Link
        style={activeLink === 'link6' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link6')}
        to="#link6"
      >
        DIY Projects
      </Link>
      <Link
       style={activeLink === 'link7' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link7')}
        to="#link7"
      >
      Interior Styles
      </Link>
    
      <Link
       style={activeLink === 'link9' ? { ...linkStyle, ...activeStyle } : linkStyle}
        onClick={() => setActiveLink('link9')}
        to="#link9"
      >
      Materials and Finishes
      </Link>
     
    </div>
  );
};

export default ArticleLinks;
