import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';
import NavbarArticles from '../Navbar';
import axios from 'axios';
import ArticleLinks from './ArticleLinks';
import article4pic1 from './images/article4pic1.jpeg';
import article4pic2 from './images/article4pic2.jpeg';
import article4pic3 from'./images/article4pic3.jpeg';
import article4pic4 from './images/article4pic4.jpeg';
import article4pic5 from './images/article4pic5.jpeg';
import Footer from '../footer';

const Article4 = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 
  // Setting articleName in localStorage
 localStorage.setItem('articleName', 'The Art of Furniture Selection and Arrangement in Interior Design');
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
    <img className='article4pic1' src={article4pic1} alt="MainImage" />
    <div className="article-container">
 
    <h1>The Art of Furniture Selection and Arrangement in Interior Design</h1>
    <h5 className='publisher'>By Sasha Weilbaker</h5>
      <h5 className='publisher'>October 29, 2022</h5>

    <p><strong>Introduction:</strong> Creating a well-designed and inviting living space is like putting together a puzzle. One of the essential pieces of this puzzle is furniture. Furniture not only serves functional purposes but also plays a significant role in shaping the overall aesthetic and feel of your interior. From cozy sofas to elegant dining tables, each piece has the power to transform your space into a harmonious and stylish haven. In this article, we will explore the art of furniture selection and arrangement in interior design, guiding you through the process of creating a balanced and captivating environment.</p>

    <h2>Understanding Your Space:</h2>
    <p>Before selecting furniture, take a moment to acquaint yourself with the canvas you're working on- your living space. Whether it's a cozy nook or an expansive expanse, grasping the dimensions and layout is the compass that guides your choices. This awareness empowers you to select furniture that fits snugly without overpowering or leaving awkward gaps, ensuring a seamless blend between your vision and reality.</p>

    <h2>Defining Your Style:</h2>
    <p>Each interior possesses a unique personality - a reflection of your taste and preference. It might embrace modern chic, traditional elegance, minimalistic simplicity, or an eclectic blend. Pinpoint the style that resonates with your soul, and let it be the North Star that guides your furniture choices. By maintaining a consistent style, you orchestrate a symphony of design elements that not only pleases the eye but also tells a cohesive story.</p>

    <h2>Functionality Matters:</h2>
    <p><strong>While aesthetics are important, functionality should never be compromised.</strong> it's functionality that defines the lasting relationship with your space. Delve into the purpose of each room and the role your furniture will play within it. A delicate equilibrium between style and practicality ensures that your space not only looks beautiful but also serves as a functional haven for daily life.</p>

    <h2>Creating Focal Points:</h2>
    <p>Every masterpiece has a focal point, and in the canvas of interior design, furniture takes on this role with grace. A striking piece - a meticulously crafted coffee table, an exquisite bookshelf - becomes the heartbeat of the room. It captures attention, infuses purpose, and sets the tone for the entire space, like a brilliant gem nestled within a delicate setting.</p>

    <h2>Scale and Proportion:</h2>
    <p>Harmonizing scale and proportion is an art that breathes life into furniture arrangement. Mingle larger elements with their petite counterparts to orchestrate a visual ballet of balance. The goal is to avoid an overwhelming dominance of large items or the chaos of a cluttered collection of tiny objects, allowing your space to breathe with elegance and finesse.</p>

    <h2>Traffic Flow:</h2>
    <p>Imagine your room as a bustling dance floor, where the furniture choreography ensures seamless movement. Let this visualization guide your arrangement, especially in high-traffic areas like the living room and kitchen. By arranging furniture in a way that facilitates effortless navigation, you create a functional rhythm that enhances both aesthetics and practicality.</p>

    <h2>Experiment with Layouts:</h2>
    <p>Design, like any art form, thrives on experimentation. Don't shy away from trying out different furniture configurations. As you shift and rearrange pieces, you breathe new life into your space. With every arrangement, you unearth fresh perspectives, revealing the ideal layout that marries visual appeal with functional efficiency.</p>

    <h2>Texture and Color Harmony:</h2>
    <p>In the tapestry of interior design, texture and color are the threads that weave magic. Consider the textures and hues of your furniture in relation to the overarching color palette of your room. By juxtaposing different textures and maintaining a harmonious color scheme, you add layers of depth and visual intrigue to your space, transforming it into a canvas of sensory delight.</p>
    <p> <img src={article4pic3} alt="coloursamples" /></p>
    <h2>Personal Touches:</h2>
    <p>Elevate your space from the ordinary to the extraordinary by infusing it with your unique essence. Embrace accessories like cushions, throws, and artwork that mirror your personality. These elements not only complement your furniture but also imprint your individuality onto the design. The result is a space that's not just aesthetically pleasing but also deeply personal and inviting.</p>

    <h2>Embrace Negative Space:</h2>
    <p>Remember that not every corner needs to be filled with furniture. Embrace negative space, as it provides visual breathing room and allows the eye to rest. When dealing with a small space, it's better to keep things simple. Filling up a tiny room with too much stuff can make it hard to use, and having too much clutter isn't good for how you feel.“Overstuffing a small room makes it difficult to use and clutter has a negative impact on so many aspects of life,” says Deanne M. Bridenstine. “Curate everything that goes into the room so it's somewhere you love to be.” </p>

    <h2>Storage Solutions for Your Space:</h2>
    
    <p> According to Kristin Patrician, using <em>decorative baskets</em> and <em>stylish boxes</em> can help hide personal items like throw blankets, TV remotes, and small things that might otherwise create clutter. Patrician also advises giving special consideration to storage options when exploring new furniture. She suggests opting for pieces that offer built-in storage such as drawers, shelves, or hidden compartments.</p>

    <p>Emily Williams adds that maximizing utility is essential, including built-in storage and multi-purpose tables and shelves.</p>

    <p>Innovative elements like storage headboards and entryway benches not only provide essential storage space but also bring a touch of imagination to any room.</p>
    
    <h2>Optimize Your Wall Space:</h2>

    <p>When confronted with limited horizontal room, consider utilizing the vertical aspect instead! Vertical wall shelving, for example, offers a smart solution that maximizes storage without consuming excessive floor space. Following Kristin Patrician's advice, selecting closed storage bookcases with glass doors not only safeguards your valuable possessions but also visually expands the room by introducing transparency through glass. Embracing the vertical dimension not only provides practical advantages but also works wonders on the perception of ceiling height. Rachel Robarge suggests a subtle technique to achieve this effect – hanging floor-length curtains near the ceiling. This strategy generates elongated, vertical lines that can create an illusion of heightened ceilings. To further enhance the sense of spaciousness, Robarge recommends extending your wall color onto your crown moldings - a straightforward yet impactful method to amplify the feeling of a more expansive area.</p>

    <h2>Choosing the Right Seating:</h2>
    <p>When it comes to selecting seating for your compact area, there are a few strategies you can consider to optimize your space.</p>
    <p> <img src={article4pic5} alt="seating" /></p>
    <h3>Avoiding Bulkiness</h3>
    <p><strong>Kristin Patrician</strong> advises steering clear of sectionals, as they can visually seem large and bulky, causing your space to feel cramped. Instead, Patrician proposes breaking up your seating arrangement by using a sofa and accent chairs. This not only divides your space but also gives the impression of a more open area.</p>

    <h3>Optimal Arrangements</h3>
    <p><strong>Megan Torres</strong> recommends pairing two smaller sofas or loveseats together, or combining a small sofa with an armchair or a chair without arms, rather than having one massive sofa. Torres suggests that this approach optimizes a small room. Sofas also serve as natural dividers for those using a room for multiple activities.</p>

    <h3>Space-Efficient Design</h3>
    <p>When picking furniture for a petite apartment, <strong>Chris Walsh</strong> suggests going for pieces with a lower profile that occupy minimal space. "This design suits an open and snug concept," says Walsh. "Less is more in a small area."</p>
<h2>Accessorizing and Coordinating:</h2>
<p>Beyond furniture pieces themselves, the magic of interior design lies in the thoughtful selection of accessories that enhance the space. Think about coordinating elements such as cushions, rugs, curtains, and artwork. These accents can tie together the color palette, textures, and themes of your furniture. A well-chosen cushion can echo the color of your accent chair or draw attention to the intricate details of your sofa. Rugs can define seating areas within larger spaces and add warmth, while artwork can become the centerpiece that ties the entire room together.</p>
  <h2>Ergonomics and Comfort:</h2>
<p>While aesthetics are paramount, the comfort of your furniture should never be compromised. Ergonomics play a vital role, especially in seating. Look for furniture pieces that provide proper support and comfort for prolonged use. Opt for chairs with ergonomic designs that encourage good posture and sofas with cushions that strike the right balance between softness and support. Remember, a beautiful space is truly inviting only when it's comfortable to live in.</p>   

    <h2>Mixing Textures for Depth:</h2>
    <p>When choosing furniture, think about how different materials and textures can add depth and character to your space. Combining materials like wood, metal, glass, and soft fabrics can create a layered and visually interesting environment. For instance, a wooden coffee table paired with a sleek metal lamp and a cozy upholstered sofa can create a tactile and visual contrast that elevates the overall aesthetic.</p>

    <h2>Furniture That's a Work of Art:</h2>
    <p>Imagine if your furniture wasn't just functional but also a piece of art. Seek out furniture with unique designs, intricate patterns, and sculptural forms that can act as focal points in your interior. These pieces can transcend mere functionality and become conversation starters. A creatively shaped bookshelf, a chair with an innovative silhouette, or a statement coffee table can all serve as functional art installations that lend a distinctive and captivating touch to your space.</p>
    <p> <img src={article4pic2} alt="coffeetable" /></p>
    <h2>Strategic Placement for Sunlit Ambiance:</h2>
    <p>Furniture placement has the power to harness natural light and set the mood in your space. Position seating near windows to welcome sunlight that filters in and creates a warm and inviting atmosphere. The strategic placement of mirrors across from windows can reflect and amplify natural light, making your space appear larger and more luminous. This technique not only emphasizes the beauty of your furniture but also maximizes the potential of natural illumination to transform your environment.</p>

    <h2>Showcasing Personal Collections:</h2>
    <p>Your furniture arrangement can also act as a showcase for your personal collections and cherished possessions. By incorporating open shelves, glass display cabinets, or specially designed furniture with built-in niches, you can create dedicated spaces to exhibit items that reflect your passions and interests. Whether it's books, figurines, or memorabilia, integrating your collections into your design adds a layer of authenticity and personality to your living space.</p>

    <h2>Inviting Nature Indoors:</h2>
    <p>Bringing elements of nature indoors is a rising trend in interior design. Opt for furniture that embraces biophilic design principles, featuring natural materials, organic shapes, and even space for potted plants. Items like wooden tables, woven chairs, and leafy prints can infuse your interior with a sense of connection to the outdoors. Biophilic design not only enhances the aesthetics but also contributes to a calming and rejuvenating atmosphere.</p>

    <h2>Acoustics and Furniture Arrangement:</h2>
    <p>Creating a harmonious soundscape is often overlooked in interior design. Your choice of furniture arrangement can impact the acoustics of your space. Soft furnishings like sofas, rugs, and curtains can help absorb sound and prevent echoes. Thoughtful placement of furniture can contribute to balanced sound distribution, enhancing the auditory experience in your space. By considering both the visual and acoustic aspects of furniture arrangement, you're crafting a holistic sensory environment.</p>

    <h2>Global Inspirations and Cultural Fusion:</h2>
    <p>Furniture selection offers an exciting opportunity to draw inspiration from various cultures around the world. Incorporate elements from different regions, such as Asian-inspired screens, African textiles, or Scandinavian simplicity. Infusing your design with global influences not only adds visual interest but also showcases your appreciation for diverse aesthetics. These cross-cultural choices can create a sense of intrigue and open up conversations about the stories and traditions behind each piece.</p>

    <h2>Conclusion:"Your Space, Your Design"</h2>
    <p>In the exciting world of making our homes look great, picking the right furniture and arranging it is like being the conductor of a wonderful music show. As we go on this journey of creating spaces that show who we are and what we dream of, these choices are like the different colors we use on a painting. Choosing and arranging furniture isn't just about how it works -it's about making the feeling of the room just right for us. When we pick each piece carefully, our rooms change and become more like us, telling stories through how things are placed. Just like a band playing together makes beautiful music, our rooms come to life when furniture works together in a nice way. This mix of comfort and style turns our regular spaces into cozy places where we feel safe. Among all the things that make a room look good, furniture is really important, reminding us that arranging things is a bit like telling our stories with a cool touch.</p>
    <p> <img src={article4pic4} alt="colourfurniture" /></p>
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
  
export default Article4;
