import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';
import NavbarArticles from '../Navbar';
import axios from 'axios';
import article2pic1 from './images/article2pic1.jpeg';
import article2pic2 from './images/article2pic2.jpeg';
import article2pic3 from './images/article2pic3.jpeg';
import article2pic4 from './images/article2pic4.jpeg';
import article2pic5 from './images/article2pic5.jpeg';
import ArticleLinks from './ArticleLinks';
import Footer from '../footer';

const Article2 = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 
//Fetch Likes
localStorage.setItem('articleName', 'Room Makeovers');
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
    
    const newCommentData = {
      articleName: storedArticleName,
      comment: newComment,
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

  return (
    <div>
    <NavbarArticles />
    <div style={{paddingTop: '10px'}}><ArticleLinks /></div>
     <p> <img className='article2pic1' src={article2pic1} alt="MainImage" /></p>
    <div className="article-container">
    
      <h1>The Magic of Room Makeovers: Transforming Spaces with Personal Style</h1>

      <p>
        Have you ever walked into a room and felt an instant sense of comfort and delight? That's the magic of a well-executed room makeover. It's more than just rearranging furniture; it's a creative journey that turns empty spaces into inviting retreats that reflect your personality. Let's delve into the world of room makeovers and discover how they can breathe new life into your living spaces.
      </p>
      <p>A room makeover is a captivating journey of transformation that turns an ordinary space into a haven of comfort, style, and personality. It's about infusing your unique essence into every corner, creating an environment that resonates with your desires. With a blend of creative vision and design expertise, a room makeover breathes new life into your surroundings. It's not just about rearranging furniture or adding a fresh coat of paint; it's an opportunity to tell your story through colors, textures, and carefully chosen decor. It's a chance to step into a space that welcomes you with open arms, where comfort and beauty coexist in perfect harmony.</p>
     
   
      <h1>Unleash Your Creativity</h1>
        <p>The process begins with a spark of inspiration. Maybe it's a picture in a magazine or a memory from a special trip. Colors, patterns, and textures start to come to life in your mind, shaping the character of the room. From soothing neutrals to vibrant bursts of color, every hue sets a unique mood.</p>
     
      
        <h1>Infuse Your Personal Touch</h1>
      <p>A room makeover is your chance to showcase your personality. Display your favorite artwork, cherished mementos, or even heirlooms that tell your story. These pieces add a personal touch that makes the space uniquely yours. Remember, less can be more - each decoration should have a purpose and contribute to the room's ambiance.</p>
       
        
      <h1>Adapt and Evolve</h1>
        <p>A room makeover isn't a one-time event; it's a journey of evolution. Just as you change and grow, your space should adapt too. Flexible furniture arrangements and versatile decor let you transform the room to match your current needs. As the seasons change, so can the atmosphere – a cozy winter setting can turn into a bright spring haven with a few simple adjustments</p>
      
  
     
      <h1>More Than Meets the Eye: Functionality and Aesthetics </h1>
       
        <p>A successful room makeover is the perfect marriage of functionality and aesthetics. Imagine a room that not only looks stunning but also serves your needs. Whether it's a cozy reading corner, a workspace bathed in natural light, or a serene bedroom, a room makeover can transform each space into an oasis of purpose.</p>
     
      
        <h1>The Big Reveal: Feeling the Transformation </h1>  
        <p>Imagine the excitement of walking into your newly made-over room. It's like unwrapping a present that holds all your dreams. A room makeover is more than just changing things; it's about turning your ideas into reality.</p>
      

   
       <h1>The Art of Repurposing: Sustainability and Creativity</h1>
       
    
      <p>Room makeovers need not always involve brand-new furniture and decor. Consider the beauty of repurposing and upcycling. That old wooden chest could become a charming coffee table, and a vintage mirror might find new life as an elegant headboard. This not only adds character to your space but also contributes to a more sustainable approach to design.</p>

        <h1>Budget-Friendly Brilliance</h1>
     <p>You don't need a big budget for a makeover. Prioritize impactful items and consider DIY projects for a personal touch without breaking the bank.</p>
      
      
      <h1>Visual Delight: Before and After Images</h1>
      <p>The power of visual storytelling is evident in the before and after images of room makeovers. Witnessing the side-by-side comparison of the room's transformation is not only satisfying but also inspiring. The "before" image serves as a reminder of the room's initial state, highlighting the challenges and opportunities that the makeover aimed to address. In contrast, the "after" image showcases the successful execution of design concepts, providing a glimpse of the room's newfound beauty, functionality, and charm.</p>
      <p> <img src={article2pic2} alt="drawingroom" /></p>
     
      <p>Room makeovers are more than just physical changes; they are journeys of creative expression and self-discovery. The process of turning a lackluster space into a beautiful, functional haven is a testament to the power of design and human imagination. The before and after images of room makeovers encapsulate the journey from potential to reality, showcasing the transformative impact of thoughtful design choices. So, whether you're looking to revamp a single room or breathe new life into your entire living space, remember that a room makeover is your chance to create a masterpiece that reflects your unique personality and style.</p>

      <p><img src={article2pic4} alt="livingroom" /></p>
      
      <h1>Embracing Minimalism</h1>
      
      <p>One of the hallmarks of a modern kitchen is the embrace of minimalism. Say goodbye to cluttered countertops and overcrowded shelves. A modern makeover starts by decluttering and streamlining your kitchen's layout. Opt for sleek, handle-less cabinets that exude elegance while maintaining a clutter-free appearance. Open shelving with clean lines can display your kitchen essentials in an organized manner, allowing functionality to blend seamlessly with design.Transform your kitchen into a modern marvel, and watch as it becomes a reflection of your personal style and the epitome of 21st-century living.</p>
      <p><img src={article2pic3} alt="kitchen" /></p>

      
      <p>Turning a modest dining room into a minimalistic modern oasis through a room makeover is an artful journey of refinement. Stripping away excess, the transformation embraces simplicity, creating a serene and uncluttered space. The makeover involves a careful curation of design elements, opting for clean lines and subdued color palettes. Furnishings are streamlined, with elegant, unadorned chairs and a sleek, unobtrusive table at the center. The result is a dining room that exudes modernity in its purest form, offering a serene canvas for shared meals and meaningful conversations.</p>
      <p> <img src={article2pic5} alt="Diningroom" /></p>
    
      <h1>Conclusion: Embracing the Essence of Personalized Transformation"</h1>
      <p>In the realm of interior design, a room makeover is the ultimate expression of creativity and transformation. As we conclude our journey through the magic of revamping spaces, we're reminded that a room makeover is more than just about aesthetics. It's about creating a haven that reflects your personality, a place where memories are made and dreams take shape. The before-and-after comparison speaks volumes – from a blank canvas to a masterpiece that evokes emotions and stories. Whether you're embracing minimalism or mixing different styles in a creative way, a room makeover is a testament to your vision and the enchanting possibilities of design. So, take this inspiration and embark on your own journey of reimagining spaces, for the world of room makeovers is a canvas where imagination knows no bounds.</p>
    

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
    <div className="comments">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
          <p>{comment.username}: {comment.comment}</p>
        </div>
      ))}
    </div>
    <textarea
      placeholder="Write your comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button onClick={submitComment}>Post Comment</button>
  </div>

    
    </div>
    <Footer />
    </div>  
);
};
  
export default Article2;
