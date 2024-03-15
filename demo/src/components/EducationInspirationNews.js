import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './EducationInspirationNews.css';
import Navbar from './Navbar';
import ChatbotUI from '../ChatbotUI';
import backgroundImage from './images/ltotbngnzzu-uai-1600x900.jpg';
import { FaExternalLinkAlt, FaArrowAltCircleUp } from 'react-icons/fa'; // Import the arrow icon

const override = css`
  display: block;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EducationInspiration = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedNews, setDisplayedNews] = useState(9);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for arrow icon visibility
  const [scrollPosition, setScrollPosition] = useState(0); // State for current scroll position

  useEffect(() => {
    fetchNews();
    window.addEventListener('scroll', handleScroll); // Listen for scroll events
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on component unmount
    };
  }, []);

  const fetchNews = async () => {
    try {
      const apiKey = '82912320840d425989a9fb0f70ad54be';
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=(interior%20design%20OR%20home%20OR%20furniture)&apiKey=${apiKey}`
      );

      const newsData = response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        source: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString(),
        url: article.url,
        image: article.urlToImage,
      }));

      setNews(newsData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    setShowScrollToTop(position > 100); // Show arrow icon when scrolled down a certain height (e.g., 100px)
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to top
    });
  };

  const loadMoreNews = () => {
    setDisplayedNews(prev => prev + 9);
  };

  return (
    <div className='eduAndIns'>
      <Navbar />
      <style>
        {`
          html, body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-attachment: fixed;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <div className='EduH1'>
        <h1 style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '40px', color: 'white' }}>Latest Industry News and Updates</h1>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <ClipLoader css={override} size={150} color={"#FFFFFF"} loading={loading} />
        </div>
      ) : (
        <div className="news-container">
          {news.slice(0, displayedNews).map((item, index) => (
            <div
              key={index}
              className="news-box"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                position: 'relative',
              }}
            >
              <img src={item.image} alt={item.title} className="news-image" />
              <a
                href={item.url}
                className="read-more"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt style={{ marginRight: '5px', color: 'white' }} />
              </a>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Source: {item.source}</p>
              <p>Date: {item.date}</p>
            </div>
          ))}
          {showLoadMore && (
            <button onClick={loadMoreNews} className="load-more-button">
              Load More
            </button>
          )}
        </div>
      )}

      {/* Arrow icon */}
      {showScrollToTop && (
        <div className="scroll-to-top" style={{position: 'fixed', bottom: '2%', left: '2%' }} onClick={scrollToTop}>
          <FaArrowAltCircleUp size={50} color="white" />
        </div>
      )}

    </div>
  );
};

export default EducationInspiration;
