import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DesignInspirationIdeas.css'; // Import your custom CSS file
import Navbar from './Navbar';
import backgroundImage from './images/ltotbngnzzu-uai-1600x900.jpg';
//import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import userContentImg from './images/37545a5cc810001aa90b19e511e80e2e.jpg';
import ChatbotUI from '../ChatbotUI';
const DesignInspirationIdeas = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyBnE21Ln-VyZULOKv_VVhNL3gH6Vu5E33Q&channelId=UCKHKBrh1pmLOsYBuVm13J4w&part=snippet,id&maxResults=10`
        );
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      setLoading(true);
      try {
        if (selectedPlaylistId) {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBnE21Ln-VyZULOKv_VVhNL3gH6Vu5E33Q&playlistId=${selectedPlaylistId}&part=snippet&maxResults=10`
          );
          setPlaylistVideos(response.data.items);
        }
      } catch (error) {
        console.error('Error fetching playlist videos:', error);
      }
      setLoading(false);
    };
    fetchPlaylistVideos();
  }, [selectedPlaylistId]);

  const handlePlaylistClick = playlistId => {
    setSelectedPlaylistId(playlistId);
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
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
        <img style={{height: '700px', width: '2000px', marginBottom: '-9%'}} src={userContentImg} alt='image'/>

        <div className="playlist-links">
        {playlists.map(playlist => (
  <a
    key={playlist.id}
    href="#"
    onClick={() => handlePlaylistClick(playlist.id)}
    style={{
      color: 'white', // Change link color as per your preference
      textDecoration: 'none', // Remove underline from links
    margin: '10px',
      fontSize: '16px', // Set font size
      padding: '20px',
      backgroundColor: '#333333',
    }}
  >
    {playlist.snippet.title}
  </a>
))}

        </div>
        {loading && <div>Loading...</div>}
        <div className="video-grid">
          {playlistVideos.map(video => (
            <div className="video-container" key={video.snippet.resourceId.videoId}>
              <iframe
                title={video.snippet.title}
                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignInspirationIdeas;
