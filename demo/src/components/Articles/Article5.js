import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';
import NavbarArticles from '../Navbar';
import axios from 'axios';
import article5pic1 from './images/article5pic1.jpeg';
import article5pic2 from './images/article5pic2.jpeg';
import article5pic3 from'./images/article5pic3.jpeg';
import article5pic4 from './images/article5pic4.jpeg';
import article5pic5 from './images/article5pic5.jpeg';
import article5pic6 from './images/article5pic6.jpeg';
import ArticleLinks from './ArticleLinks';
import Footer from '../footer';
const Article5 = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 
  
//Fetch Likes
// Setting articleName in localStorage
localStorage.setItem('articleName', 'Small Space Design');
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
          <p> <img className='article4pic1' src={article5pic1} alt="MainImage" /></p>
          <div className="article-container">
            <h1>Small Space Design: Maximizing Comfort and Style</h1>
            
      <h5 className='publisher'>By Rachel Edwards</h5>
      <h5 className='publisher'>07 APRIL 2023</h5>
            <p>Designing a small space can be both exciting and challenging. Whether it's a cozy apartment, a compact studio, or a petite room, the principles of small space design can help you create a comfortable and stylish environment that makes the most of every inch. In this article, we'll explore the art of small space design in interior decorating, offering easy-to-understand insights to transform your tiny space into a functional and inviting haven.</p>
            <h2>Embracing Minimalism and Functionality</h2>
            <p>Small spaces thrive on the concept of less is more. Embracing minimalism means carefully curating your furniture and decor to include only what is essential. Start by decluttering and organizing your belongings. Keep items that hold value or serve a purpose, and let go of unnecessary clutter. Functional furniture pieces with built-in storage become your best friends in a small space. Ottomans with hidden compartments, beds with drawers underneath, and wall-mounted shelves not only save space but also offer storage solutions that keep your area neat and tidy.</p>
            <h2>Strategic Furniture Selection</h2>
            <p>When selecting furniture for small spaces, consider pieces that are appropriately scaled. Bulky furniture can overwhelm a small room, while smaller furniture can appear lost. Opt for furniture with sleek profiles and open bases that allow light to pass through, creating an illusion of more space. Multi-functional furniture, such as sofa beds or nesting tables, offers versatility without sacrificing style. Foldable furniture that can be tucked away when not in use is a fantastic option for optimizing space.</p>
            <h2>Color and Light for Visual Expansion</h2>
            <p>Color and light play a pivotal role in small space design. Lighter colors like whites, pastels, and soft neutrals can make a room feel more open and airy. They reflect light and create an illusion of space, making the area seem larger than it actually is. Don't be afraid to add pops of color through accents like throw pillows, rugs, or artwork, but keep the overall palette cohesive. Maximizing natural light is essential; avoid heavy drapes that block light and opt for sheer curtains that let sunlight in.</p>
            <h2>Mirrors: Illusion of Depth</h2>
            <p>Mirrors are a secret weapon in small space design. They visually expand a room by reflecting light and creating the illusion of depth. Strategically placing mirrors across from windows can bounce light around, making the space feel brighter and more open. You can opt for mirrored furniture pieces or create a mirror gallery wall for a chic and impactful design element.</p>
            <p> <img src={article5pic2} alt="mirror" /></p>
           
            <h2>Visual Continuity and Multi-Functional Zones</h2>
            <p>Creating visual continuity and cohesive flow is crucial in small space design. Choose a consistent color palette and design theme that spans throughout the space. To make the most of your area, designate multi-functional zones. A living room can double as a home office with a compact desk, or a cozy reading nook can be integrated into a bedroom corner. This approach blurs the lines between different functions, optimizing your space without compromising comfort.</p>
            <h2>Vertical Gardens and Greenery</h2>
            <p>Bringing nature indoors can infuse life and vibrancy into a small space. Vertical gardens, hanging planters, and potted plants not only add a touch of green but also contribute to better air quality. Greenery introduces an organic element that softens the space, making it feel more inviting and less confined.</p>
            <p> <img src={article5pic4} alt="greenry" /></p>
            <h2>Smart Technology Integration</h2>
            <p>Incorporating smart technology can enhance the functionality and aesthetics of a small space. From smart lighting that adjusts to your preferences to space-saving gadgets like foldable furniture or wall-mounted TVs, technology can seamlessly integrate into your design, making your small space more convenient and enjoyable.</p>
            <h2>Creating Illusions with Patterns</h2>
            <p>Patterns can be used strategically to create visual interest and depth. Vertical stripes, for example, draw the eye upward, making the room appear taller. Opt for smaller-scale patterns that don't overwhelm the space. Patterns in textiles, such as curtains or rugs, can add texture and personality without making the room feel cramped.</p>
      
            <h2>Enhancing Small Spaces: Fresh Ideas for Interior Design</h2>
            <p>Designing a small space is like embarking on a creative journey where innovation and imagination meet functionality. Whether you're crafting the perfect cozy apartment or transforming a petite room into a haven of comfort, small space design has the power to make every inch count. In this exploration of interior decorating, we'll delve into an array of new and exciting ideas to help you unlock the full potential of your compact living area.</p>
            <h2>Customizable Furniture for Ultimate Adaptability</h2>
            <p>Imagine a world where your furniture can adapt to your ever-changing needs. Customizable furniture takes center stage in small space design, offering a flexible solution to maximize the utility of your space. Think modular sofas that can be rearranged to fit different gatherings or dining tables that can be extended for guests. These versatile pieces ensure that your small area remains dynamic, effortlessly transitioning between various activities and occasions.</p>
            <h2>Vertical Space Utilization</h2>
            <p>In small spaces, vertical space is an often-underutilized asset. Think beyond floor-level storage and consider wall-mounted shelves, hanging plants, or floating cabinets. Vertical storage not only maximizes space but also draws the eye upward, making the room appear taller. Tall bookshelves and wall units not only provide storage but also add a sense of grandeur to the space.</p>
      <p> <img src={article5pic3} alt="verticalspace" /></p>
            <h2>Artful Contrasts with Texture Play</h2>
            <p>Texture is the unsung hero of design, capable of transforming a space through visual and tactile richness. Incorporating different textures, from soft velvets to rugged jute, can create a harmonious contrast that adds depth and personality to your small room. Imagine walking into a space that not only looks appealing but also feels inviting, with each texture offering a new layer of comfort and intrigue.</p>
            
            <h2>Innovative Furniture Fusion</h2>
            <p>Imagine furniture that defies conventions by seamlessly combining two functions in one elegant piece. Innovative furniture fusion is a rising trend in small space design, offering solutions that merge comfort and practicality. Picture a sleek coffee table that converts into a dining table or a sofa that unfolds into a guest bed. These ingenious designs are a testament to the marriage of form and function, elevating your small space to new levels of efficiency.</p>
            <h2>Multipurpose Magic with Transformable Furniture</h2>
            <p>Transformable furniture is like a magician's trick applied to design. It allows you to make the most of your limited space by serving multiple purposes. Imagine a wall unit that conceals a desk or a bookshelf that unfolds into a dining table. These innovative pieces are the epitome of efficiency, ensuring that every element in your small area contributes to your comfort and convenience.</p>
            <h2>Color Psychology in Small Space Design</h2>
            <p>Colors wield a powerful influence on our perception of space and ambiance. Consider the impact of a well-chosen color palette that enhances the perceived size and mood of your small area. Imagine soft neutrals and light tones creating an illusion of airiness, while vibrant accents inject energy and personality. The art of color selection in small space design goes beyond aesthetics, playing a pivotal role in shaping the overall atmosphere.</p>
            <p> <img src={article5pic5} alt="colourpsychology" /></p>
            <h2>Personalized Nooks for Intimate Moments</h2>
            <p>Small spaces provide the perfect canvas for crafting personalized nooks that cater to your specific interests and relaxation needs. Imagine transforming a corner into a cozy reading haven with a comfortable chair, a soft throw, and ample lighting. These intimate spaces become your retreats within a retreat, offering solace and tranquility amidst the bustling world outside.</p>
          
            <h2>Thoughtful Storage Solutions</h2>
            <p>Efficient storage solutions are the backbone of successful small space design. Imagine seamlessly integrating storage into unexpected places, such as under beds, within stairs, or behind decorative panels. These hidden storage compartments optimize your space, allowing you to keep belongings neatly tucked away while maintaining a clutter-free environment. From sleek built-in cabinets to creative shelving units, thoughtful storage solutions enhance both aesthetics and functionality.</p>
            <h2>Space-Saving Décor: The Power of Wall-Mounted Pieces</h2>
            <p>Wall-mounted décor is like a symphony of style and space conservation. Imagine floating shelves, wall-mounted desks, and hanging planters that free up valuable floor area. These pieces not only serve a functional purpose but also contribute to the overall visual appeal of your small space. They transform walls into artful canvases that showcase your personality while leaving room to breathe.</p>
            <h2>Fluid Transition Between Spaces</h2>
            <p>The boundaries between different areas in your small space can be delightfully fluid. Imagine a dining area that seamlessly flows into a cozy living space, creating a sense of unity. This seamless transition between zones blurs the lines and enhances the perceived size of your area. Clever furniture placement and consistent design elements ensure that each space complements the others, forming a harmonious whole.</p>
            <h1>Expert Advices on Designing of Small Spaces</h1>
            <h2>Lift space with colour:</h2>
            <p> "Paint is a clever way to change the perception of space in a room," says Helen Shaw, UK Director at Benjamin Moore. "As a rule of thumb, lighter colours tend to make a space feel bigger, while darker colours tend to advance and bring the wall towards you making a room feel smaller."</p>
            <p>Applying a consistent color to both the walls and ceiling of a small room can soften the distinction between its edges, producing the illusion of expanded space. This technique proves particularly effective when extending the same color to encompass elements like woodwork, doorframes, and radiators.</p>
            <h2>Don't be afraid of statement furniture:</h2>
            <p> "The key in a small apartment space is to ensure your furniture is suited to the space available. Nothing makes a room look smaller than filling it with undersized furniture," say the experts at KING Living.</p>
            <p>Rather than reducing the size of all your items and trying to fit numerous small side tables, slim armchairs, and tiny decor items into a confined area, opt for a solitary piece that adequately occupies the space and serves a purpose</p>
            <p>Larger pieces don't need to be propped against a wall in small rooms either, but instead act to zone a space according to its use. "In the living room, don't feel that your sofa needs to sit against the wall. Pulling it off the wall will create the illusion of space and make the room look bigger."     </p>
           <h2>Pattern is your best friend:</h2>
           <p>"We like to create spaces that feel layered and homely, that allow you to create mess without feeling messy or needing to put things away the second you put them out," says Camilla Clarke, Creative Director at Albion Nord. "It's important to make a space feel relaxed and not sterile or unliveable."</p>
           <p> <img src={article5pic6} alt="smallspaceroom" /></p>
          
           <h2>Wrapping up</h2>
          <p>In the exciting world of interior design, creating beautiful small spaces is like a clever puzzle. We've learned that even in tiny rooms, we can make big things happen. From picking the right furniture to using colors and patterns, we've uncovered tricks to make small spaces cozy and cool.</p>
      
      <p>Imagine turning a small room into a cozy retreat with just the right furniture. Instead of squeezing lots of little things, we can choose one special piece that fits perfectly. We've also learned that colors and mirrors can make rooms feel bigger and brighter.</p>
      
      <p>As we finish our journey through small space design, let's remember that small spaces have big potential. With a little creativity, we can make our tiny corners shine with our own style. So, whether you have a big room or a small one, remember that a touch of design magic can make any space feel like home.</p>

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
  
export default Article5;
