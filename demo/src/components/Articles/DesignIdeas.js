import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';
import NavbarArticles from '../Navbar';
import axios from 'axios';
import article1pic1 from './images/article1pic1.png';
import article1pic2 from './images/article1pic2.jpg';
import article1pic3 from './images/article1pic3.png';
import article1pic4 from './images/article1pic4.png';
import article1pic5 from './images/article1pic5.png';
import ArticleLinks from './ArticleLinks';
import backgroundImage from '../images/bg.jpg';
import Footer from '../footer';

const DesignTrendsArticle = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
 
  const timestampStyle = {
    color: 'gray',
    fontSize: '12px',
  };
// Setting articleName in localStorage
localStorage.setItem('articleName', '11 Room Dividers That Bring Form and Function to Your Space');

const fetchLikes = async () => {
  try {
    const storedArticleName = localStorage.getItem('articleName');
    if (!storedArticleName) {
      console.error('No articleName found in local storage');
      return;
    }
    const response = await axios.get(`http://localhost:3000/api/userLikes?articleName=${storedArticleName}`, {
      withCredentials: true,
    });
    const likedUsers = response.data.map(like => like.username);
    if (likedUsers.includes(localStorage.getItem('username'))) {
      setLiked(true);
    }
    setLikesCount(response.data.length);
  } catch (error) {
    console.error('Error fetching likes:', error);
  }
};

const handleLike = async () => {
  try {
    const storedArticleName = localStorage.getItem('articleName');
    if (!storedArticleName) {
      console.error('No articleName found in local storage');
      return;
    }
    const username = localStorage.getItem('username');
    
  const newLikeData = {
    articleName: storedArticleName,
    username: username,
  };
  
    if (!liked) {
      await axios.post(
        'http://localhost:3000/api/userLikes',
         newLikeData ,
         {
          headers: { Authorization: username },
        }
      );
      setLikesCount(prevCount => prevCount + 1);
      setLiked(true);
    }
  } catch (error) {
    console.error('Error liking article:', error);
  }
};


useEffect(() => {
  fetchLikes();
}, []);

 //Fetch Comments
 // Making a request to fetch comments
 const fetchComments = async () => {
   try {
     const storedArticleName = localStorage.getItem('articleName');
     if (!storedArticleName) {
       console.error('No articleName found in local storage');
       return;
     }
     
     const response = await axios.get(`http://localhost:3000/api/comments2?articleName=${storedArticleName}`, {
       withCredentials: true, // Allow cookies to be sent
     });
     setComments(response.data);
   } catch (error) {
     console.error('Error fetching comments:', error);
   }
 };
 
 //post comment
 
 const submitComment = async () => {
   try {
     const storedArticleName = localStorage.getItem('articleName');
     if (!storedArticleName) {
       console.error('No articleName found in local storage');
       return;
     }
     
     const username = localStorage.getItem('username');
     const timestamp = new Date().toLocaleString();

     
     const newCommentData = {
       articleName: storedArticleName,
       comment: newComment,
       timestamp: timestamp, 
     };
     
     await axios.post(
       'http://localhost:3000/api/comments2',
       newCommentData,
       {
         headers: { Authorization: username },
       }
     );
     
     setNewComment('');
     fetchComments(); // Update comments after posting
   } catch (error) {
     console.error('Error submitting comment:', error);
   }
 };
  
  useEffect(() => {
    fetchComments();
  }, []);

 
  const loadMoreComments = () => {
    setShowAllComments(true);
  };

  const showLessComments = () => {
    setShowAllComments(false);
  };

  
  return (
    <div>
      <div style={{marginLeft: '-30px'}}><NavbarArticles/></div>
      
    <style>
      {`
        html, body {
          background-image: url(${backgroundImage});
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}
    </style>
    
     <div style={{paddingTop: '10px'}}><ArticleLinks /></div>
    <img className='article1pic1' src={article1pic1} alt="MainImage" />
    <div className="article-container">
    
      <h1 className='Heading'>11 Room Dividers That Bring Form and Function to Your Space</h1>

      <h5 className='publisher'>By Hayley J. Clark</h5>
      <h5 className='publisher'>August 3, 2023</h5>
      <p>
        Room dividers have an old, luxurious origin story: They were created for use in the palaces of ancient Chinese royalty. Some of the earliest room dividers have been dated back to 200 BCE. While they were originally ornate and heavy objects of distinction, today they have taken on a wider range of functions and style—though they’re still glamorous. Their enduring popularity through the ages is due to their versatility, as they can play a valuable role in sectioning off space in small and large rooms. They come in nearly every style imaginable to suit any design scheme and make a statement. Now we can all benefit from these regal objects in our homes. Below, you’ll find some novel ways of incorporating these timeless objects so they may benefit you in everyday life.
      </p>

     
      <h1>Open-plan space divider</h1>
        <img src={article1pic2} alt="Open-plan space divider" />
        <p>Open-plan space divider - Create zones in your space with the use of a screen.</p>
       
     
      <p>The open-plan layout is common among modern houses and apartments. In these spaces, it’s likely that the living space, dining area, and kitchen all belong to the same room. While this
      layout promotes free-flowing interaction among people sharing the same home, it can be a bit overwhelming. A room divider provides separation between the dining and living areas without totally closing them off from one another.</p>
      
      <h1>Headboard</h1>
       
        <p>Headboard - Transform a typically plain, functional object into a statement-making work of art.</p>
     
      <p>This trend has become more popular in the last couple of years. Headboards can be rather simple; the most exciting they usually get is with velvet upholstery or interesting woodwork. By bolting a room divider to the wall behind a bed, you can transform a typically plain, functional object into a statement-making work of art.</p>

     
      <h1>Window-treatment replacement </h1>
       
        <p>Window-treatment replacement - Use a room divider for extra privacy while allowing light in.</p>
     
      <p>Curtains are great, but if you want to let light in without baring all, using a room divider for extra privacy is also a chic solution. In cities where many apartments have windows close to sidewalks or facing nearby buildings, this could be a great fix to give you a bit more seclusion.</p>

      <img src={article1pic3} alt="Open-plan space divider" />
      <p>
        These days, most don’t have the luxury of a formal dressing room, but incorporating a room divider as a boudoir screen in the corner of a bedroom can help create a similar atmosphere. Interior Designer Tara McCauley says, “The boudoir screen provides the perfect opportunity to indulge in a bit of fantasy—discarded silk garments draped over the edge, etc. (Perhaps an ostrich feather boa if I'm fully giving in to the main-character syndrome that a folding screen in the boudoir affords me.) It's mirrored on the bedroom side, and it provides the perfect opportunity to carry on a conversation with someone—while maintaining a modicum of modesty—and then have that cinematic outfit reveal moment when you walk out from behind the screen.”
      </p>

     
       <h1>Wall accent</h1>
       
     
      <p>Room dividers range from plain and practical to statement-making and highly artful. Consider a lacquer screen by Art Deco designer Jean Dunand used as a centerpiece for the room, or a modern scalloped folding screen. </p>

      
        <h1>Storage concealer </h1>
     
      <p>We all have a lot of stuff, and sometimes elegant storage solutions can be hard to find, so why not just hide it? Using a screen to obscure laundry, electronics, or children’s toys is an easy way to store things while keeping your aesthetic intact.</p>
      
      
      <h1>Texture</h1>
      <img src={article1pic4} alt="Texture" />
        
    
      <p>Many homes used to have wallpaper that introduced fun patterns to a room, but for many renters this is inaccessible, and it might be too much of a commitment for homeowners. Folding screens can come in many different materials that could add an interesting textural element to a room. Playing around with rattan, lacquer, paneled wood, or even ceramics—like with this piece from REM Atelier—can add a lot of excitement.</p>

      
      <h1>Cloth room divider</h1>
    
      <p>When thinking of room dividers, the primary association is with folding screens. However, they can take other forms, such as curtains hung from the ceiling. These are great for creating a dramatic transition between spaces. Also, with curtains there is a plethora of materials to choose from, which gives the flexibility to choose something unexpected. For instance, Sabine Marcelis made use of these yellow vinyl curtains, which are typically used for meat lockers.</p>
      
     <h1>Breakup wall space</h1>
     
      <p>In rooms with high ceilings, like lofts and industrial spaces, one can feel a bit swallowed by the expanse. Artwork can certainly do much to add structure, but screens can also be incorporated to chop up the large swaths of wall space. As seen here, Eileen Gray’s ClassiCon screen does much to add dimensionality.
      
      </p>
     <h1>Extra shelving</h1>
     
      <p>Typically shelving is flanked to the wall, but who says it has to be? Open-ended freestanding shelving units can serve a dual purpose as both shelving and a room divider if situated in the center of a room.

      </p>

     <h1>Small space divider</h1>
        <img src={article1pic5} alt="Small space divider" />
     
      <p>
        In urban environments, many folks are living in studio apartments, where different zones of life—work, sleep, entertainment, and cooking—can collapse on one another. Room dividers step in as handy, flexible solutions to partition off different zones of a studio, giving small-space dwellers a chance to have a little separation between rest and activity.
      </p>

       {/* Like section */}
       <div className="like-section">
       <button
         className={`like-button ${liked ? 'liked' : ''}`}
         onClick={handleLike}
         disabled={liked}
       >
         ❤️ Like
       </button>
       <span className="like-count">
  {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
</span>
     </div>
 {/* Comment section */}
 <div className="comment-section">
          <h2>Comments</h2>

          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={submitComment}>Post Comment</button>

          <div className="comments">
            {comments.slice(0, showAllComments ? comments.length : 3).map((comment, index) => (
              <div key={index} className="comment">
                <div>👤 @{comment.username}</div>
                <div className="timestamp" style={timestampStyle}>{comment.timestamp}</div>
                <div style={{ marginTop: '10px' }}>{comment.comment}</div>
              </div>
            ))}
            {comments.length > 3 && (
              <button onClick={showAllComments ? showLessComments : loadMoreComments}>
                {showAllComments ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
};
export default DesignTrendsArticle;
