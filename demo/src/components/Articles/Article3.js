import React, { useState, useEffect } from 'react';
import './DesignIdeas.css';
import NavbarArticles from '../Navbar';
import axios from 'axios';
import ArticleLinks from './ArticleLinks';
import red from './images/red.jpeg';
import blue from './images/blue.jpeg';
import brown from './images/brown.jpeg';
import yellow from './images/yellow.jpeg';
import green from './images/green.jpeg';
import orange from './images/orange.jpeg';
import purple from './images/purple.jpeg';
import advancetypes from './images/advancetypes.jpeg';
import black from './images/black.jpeg';
import colorbalance from './images/colorbalance.jpeg';
import colorpsy from './images/colorpsy.jpeg';
import multicolour from './images/multicolour.jpeg';
import restaurant from './images/restaurant.jpeg';
import types from './images/types.jpeg';
import white from './images/white.jpeg';
import Footer from '../footer';

const Article3 = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 

// Setting articleName in localStorage
localStorage.setItem('articleName', 'Color psychology in Interior Design');
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
   
     <img className='article4pic1' src={colorpsy} alt="MainImage" />
        <div className="article-container">
        
          <h1>Color psychology in Interior Design</h1>
          <h5 className='publisher'>By Yaiza Martinez</h5>
          <h5 className='publisher'>March 3, 2023</h5>
          
          <p>
            Color psychology explores how colors impact our feelings and behavior. It looks at how different colors can make us think and feel certain ways. Colors might mean different things in different cultures, but most people generally understand colors in similar ways. Color psychology helps us design places that make us feel a certain way. Colors can be grouped into warm and cool colors. Warm colors like red, yellow, and orange make us feel energetic and happy. Cool colors like blue, green, and purple make us feel calm and relaxed.
          </p>
       
        <h2>The Color Wheel and Colors:</h2>
        <p>Designers use a tool called the color wheel to pick colors that go well together. The color wheel has three types of colors:</p>
        <ul>
            <li><strong>Primary colors:</strong> These are red, yellow, and blue. They can't be made by mixing other colors.</li>
            <li><strong>Secondary colors:</strong> These come from mixing primary colors. For example, red + yellow = orange.</li>
            <li><strong>Tertiary colors:</strong> These are made by mixing primary and secondary colors together.</li>
        </ul>
        <p> <img src={types} alt="typesofcolours" /></p>
        <h2>Different Color Combinations:</h2>
        <ul>
            <li><strong>Complementary colors:</strong> These are opposite on the wheel, like blue and orange. Using them together can make things stand out.</li>
            <li><strong>Triadic colors:</strong> These are in a triangle on the wheel, like yellow, blue, and red. They can look nice together if balanced.</li>
            <li><strong>Analogous colors:</strong> These are next to each other on the wheel, like blue and green. They make a calming vibe.</li>
            <li><strong>Monochromatic:</strong> This means using different shades of one color, like light and dark blue.</li>
        </ul>
        <p> <img src={advancetypes} alt="Advance Types" /></p>
        <h2>Warm and Cool Colors:</h2>
        <p>Warm colors feel cozy and exciting. Cool colors feel peaceful. For example, red is warm, while blue is cool.</p>
        
        <h2>Non-Colors:</h2>
        <p>Colors like gray, beige, and black aren't on the color wheel, but they're still important in design. They can set a mood too.</p>
        
        <h2>Colors Talk to Each Other:</h2>
        <p>Each color works with its neighbors to create a certain feeling or look.</p>
        
        <h2>Balancing Colors for a Harmonious Space</h2>
        <p>Creating a beautiful room involves using colors in the right way. But too much color can be too much. It's like cooking-adding just the right amount of spice. Bold colors can make us feel energetic, but too many can be overwhelming. On the other hand, using only one color can be calming, but it might also look boring. The trick is finding the right mix that feels just right.</p>
        <p> <img src={colorbalance} alt="ColourBalancing" /></p>
        <h2>Colors and Their Meanings in Different Places</h2>
        <p>Colors can mean different things in different places. For example, red might mean excitement in one place but danger in another. So, when designing for people from different cultures, we need to think about what colors mean to them. It's like using the right words in a language they understand.</p>
    
        <h2>How Light Changes Everything</h2>
        <p>Colors can look different under different lights. Just like our mood changes in different settings, colors can too. Warm lights make warm colors like red look better, and cool lights match cool colors like blue. So, when picking colors, we also need to think about the kind of light in the room.</p>
    
        <h2>Feeling Colors with Our Hands and Eyes</h2>
        <p>Colors aren't just on the walls; they're also in the things we touch. The way things feel-smooth, rough, shiny-can also change how colors look. So, designers need to think about textures and materials, like the way a shiny surface makes colors brighter.</p>
    
        <h2>Exploring the Colorful Realm of Emotions: Color Psychology in Interior Design</h2>
    
        <p>Step into any room, and the first thing that strikes you is the palette of colors that adorn the space. Have you ever wondered why certain colors make you feel lively and energized, while others induce tranquility and calmness? This intriguing interplay between colors and emotions is at the heart of color psychology in interior design- a realm where hues aren't just visual delights but also emotional triggers.</p>
    
        <p>Colors, it seems, have a language of their own, whispering emotions and moods that silently shape our experiences within a space. From the fiery reds that stir passion to the serene blues that invite peaceful introspection, each shade orchestrates a symphony of feelings that resonate with our senses. Let's delve into the captivating world of color psychology in interior design to understand how this palette of emotions works its magic.</p>
    
        <p><strong>Red:</strong><br />When you set foot in a room bathed in fiery reds, you instantly feel its pulse- the rush of energy, the fervor of ambition, the heat of passion. Red ignites emotions, quickens heartbeats, and paints spaces with a sense of urgency. This is why it's a favorite for dynamic environments like fast-food restaurants or vibrant gyms. Yet, red's intensity also carries a caution - too much, and it might tip over into aggression.</p>
        <p> <img src={red} alt="Redroom" /></p>
        <p><strong>Brown: </strong><br />In contrast to red's fervor, brown offers a gentle embrace. Its earthy tones resonate with tranquility, making it an ideal companion for larger spaces where elements merge in harmonious symphony. However, brown's serenity sometimes sways towards inertia, nudging towards idleness. Yet, when coupled with vibrant shades, brown symbolizes resilience and security, offering a soothing anchor in the design.</p>
        <p> <img src={brown} alt="Brownroom" /></p>
        <p><strong>Orange: </strong><br />Radiating warmth, enthusiasm, and creativity, orange is the life of the party. It evokes optimism, encouraging gatherings and camaraderie. Kitchens and playrooms bask in its cheerful glow, fostering an atmosphere of conviviality. A blend of red and yellow, orange's vividness sparks hunger and sociability, making it a smart choice for restaurants seeking a profitable touch of vibrancy.</p>
        <p> <img src={orange} alt="Orangeroom" /></p>
        <p><strong>Purple:</strong><br />Purple is the epitome of luxury and creativity, casting an aura of mystery and intrigue. It whispers of opulence while inspiring artistic pursuits. From dressing rooms to meditation spaces, purple ignites the flames of creativity. Lavender and mauve offer a softer, regal effect, intertwining tranquility with a touch of grandeur.</p>
        <p> <img src={purple} alt="purpleroom" /></p>
        <p><strong>White: </strong><br />The pristine charm of white symbolizes peace, purity, and wholeness. It's a favorite in minimalist design, where its simplicity nurtures an uncluttered ambiance. White signifies cleanliness and is a sanctuary for freshness, making it a preferred palette for wellness centers and clinics.</p>
        <p> <img src={white} alt="whiteroom" /></p>
    <p><strong>Black: </strong><br />Black, the epitome of sophistication, effortlessly blends versatility with elegance. It's a symbol of simplicity and functionality, often thriving in modern architecture and design. Alone, an all-black room might seem overwhelming, but when juxtaposed with other colors, it creates a striking contrast that elevates design to new dimensions.</p>
    <p> <img src={black} alt="blackroom" /></p>
    <p><strong>Green: </strong><br />The color of balance, growth, and harmony, green is a gentle caress for our senses. Its calming effect makes it a natural choice for spaces designed for relaxation- think soothing spas and tranquil meditation rooms. Symbolizing fertility and perspective, green bridges the gap between our urban lives and the tranquil embrace of nature, offering a sanctuary for the soul.</p>
    <p> <img src={green} alt="greenroom" /></p>
    <p><strong>Blue: </strong><br />Step into a room bathed in blue, and you'll feel a serene hush enveloping you. Blue is synonymous with peace, stability, and calmness. It holds the power to slow our minds, heart rates, and blood pressure, creating a cocoon of relaxation. Aquatic shades, reminiscent of the sky and sea, weave a healing spell, making blue a versatile healer in the color palette.</p>
    <p> <img src={blue} alt="blueroom" /></p>
    <p><strong>Yellow: </strong><br />Yellow, like a sunbeam, brings happiness and joy wherever it touches. It radiates warmth and cheer, making it a perfect hue to inject energy into spaces like entrances and hallways. Just as the sun uplifts the earth, yellow enlivens rooms, adding a touch of positivity and vitality. From retro-inspired interiors to bohemian aesthetics, yellow lends its vibrant energy to diverse styles.</p>
    <p> <img src={yellow} alt="yellowroom" /></p>
        <p>As we navigate the palette of emotions painted by colors, it becomes evident that interior designers wield a powerful tool – the understanding of color psychology. By weaving shades into the fabric of design, they create spaces that not only please the eye but also touch the heart and soul. The next time you step into a room, pay attention to the hues around you – they might just be whispering emotions you never knew you felt.</p>
    
        <h2>Colors That Reflect You</h2>
        <p>Every person is different, and colors can make us feel a certain way. Designers talk to people to know what colors they like and what feelings they want in their room. Using colors that match their feelings can make the room feel like home.</p>
    
        <h2> The Magic Paintbrush of Design</h2>
        <p>In the world of designing rooms, colors are like a magical paintbrush. They help us create not just pretty spaces but ones that feel right for the people who use them. Just like a good story, a well-designed room uses colors to speak to our hearts and make us feel at home.</p>
    
        <h2>Creating a Unified Look with Color for Hotels, Restaurants, and Cafes</h2>
        <p>When you're designing a space for a business like a hotel, restaurant, or coffee shop, color plays a big role in shaping the overall feel. You can use color to make everything look and feel connected, giving your customers a consistent experience.</p>
        <p> <img src={restaurant} alt="restaurantdesign" /></p>
        <h2>Here are some helpful ideas for using color to make your business space feel like a well-put-together package:</h2>
    
        <h3>1-Start with Your Brand Identity:</h3>
        <p>It's like getting to know the personality of your business. Before picking colors, think about what your business stands for, its values, and its character. This helps you choose colors that tell your brand's story and keep things coherent.</p>
    
        <h3>2-Pick a Main Color:</h3>
        <p>Think of this as your star color- the one that shines the brightest. This color should really represent your brand and show up a lot in your space. It could be on walls, furniture, and decorations, giving your place a strong identity.</p>
    
        <h3>3-Mix and Match Complementary Colors:</h3>
        <p>Complementary colors are like best buddies on the color wheel. They balance each other out and make your place look well-arranged. Use these colors for extra things like cushions, rugs, and art pieces to keep things interesting.</p>
    
        <h3>4-Think about How Colors Make People Feel:</h3>
        <p>Colors can affect how we feel. Some colors are calming, others energize. Consider what emotions you want your customers to have when they're in your space. This will help you choose the right colors to create that vibe.</p>
    
        <h3>5-Keep Things the Same:</h3>
        <p>To keep your place looking sharp, use the same colors all around. It's like giving your place a signature look. From the walls to the chairs to the signs, stick with the same color palette.</p>
    
        <p>Using color to make your business space feel connected is like telling a story without words. By starting with what your brand is all about, choosing a main color, adding complementary colors, thinking about feelings, and making everything consistent, you're creating a space that speaks your brand language and leaves a lasting impression on your customers.</p>
    
        <h2>Beyond the Surface: Exploring Deeper Color Psychology in Interior Design</h2>
        <p>Color isn't just about what meets the eye- it's a powerful tool that can influence emotions, behaviors, and even the perception of space in interior design. Going beyond the basics, let's dive into some intriguing aspects of color psychology that can transform a room into a captivating experience.</p>
    
        <h2>Color Contrasts for Impact</h2>
        <p>While harmonious color schemes have their charm, strategic use of contrasting colors can create unforgettable visual impact. The juxtaposition of warm and cool tones or complementary colors can evoke dynamic tension, guiding attention to specific areas of a room. Think of a serene blue room with a burst of vibrant orange – the interplay can spark creativity and stimulate conversations.</p>
    
        <h2>The Play of Light and Color</h2>
        <p>The interaction between light and color is like a dance that changes throughout the day. Natural light showcases colors differently from artificial light. Imagine how a deep blue room appears serene under daylight but might exude cozy warmth under soft incandescent lighting. Designers harness this dance to craft atmospheres that evolve, creating a journey for occupants as daylight shifts into night.</p>
    
        <h2>Embracing Neutrals for Nuance</h2>
        <p>Neutral colors are often seen as background players, but they possess incredible subtlety. They offer a canvas for bold accents to shine, but they also contribute to the overall mood. Soft, warm neutrals can create a sense of comfort and familiarity, while cooler tones can promote relaxation. Neutrals also enhance architectural features and textures, bringing out their character in a space.</p>
    
        <h2>Cultural Interpretations of Color</h2>
        <p>Colors travel through cultural landscapes, carrying diverse meanings. For instance, white symbolizes purity in many Western cultures, yet it signifies mourning in parts of Asia. Successful interior design considers the cultural contexts of color, ensuring that a chosen palette resonates positively with the target audience and respects their traditions.</p>
    
        <h2>The Power of Biophilic Colors</h2>
        <p>Nature-inspired colors not only bring the outdoors in but also connect us to our primal senses. Greens, browns, and earthy tones induce a calming effect, fostering a connection to nature. Integrating biophilic colors in interior design not only provides aesthetic delight but also promotes well-being and reduces stress.</p>
    
        <h2>Color Storytelling</h2>
        <p>Colors can tell stories, evoking nostalgia, adventure, or luxury. Imagine a hotel room adorned in oceanic blues and sandy neutrals – it's an invitation to unwind by the shore. Deep, rich hues like velvety purples can create an air of opulence, making guests feel like royalty. Designers harness this storytelling aspect to transport occupants to different worlds within the confines of a room.</p>
    
        <h2>Incorporating Color Through Texture</h2>
        <p>Texture is a powerful tool for adding depth to color. Rough textures might give earthy tones a rustic edge, while smooth surfaces can enhance the sleekness of modern, vibrant colors. The interplay of texture and color sparks tactile experiences that amplify the emotional impact of a space.</p>
    
        <h2>Creating Color Experiences, Not Just Aesthetics</h2>
        <p>In the realm of interior design, colors are more than decorative elements- they shape experiences. Whether it's a serene sanctuary or a vibrant social hub, colors influence how we perceive and engage with spaces. Mastering color psychology means not only understanding the hues themselves but also orchestrating their interplay to craft emotions, memories, and sensory journeys that resonate long after the first glance.</p>
        <p> <img src={multicolour} alt="Multicolours" /></p>
        <h2>Conclusion: Unveiling the Magic of Colors: How They Shape Our Spaces</h2>
        <p>As we wrap up our colorful journey into the world of interior design, we're uncovering a treasure trove of insights about colors that go beyond what meets the eye. Colors are like wizards that can make us feel different things, change how we see a room, and even tell stories. Imagine colors playing a game of contrasts, like a lively dance of lights and shadows. Just like how friends with different personalities make a team exciting, colors that stand out from each other can make a room pop. Think of a peaceful blue room suddenly brightened by a burst of fiery orange-it's like a surprise that makes us feel curious and want to talk about it.</p>
    
        <p>Colors are like actors that can change their roles with different types of light. Natural sunlight and cozy lamp light can make colors look different. Picture a cozy blue room under daylight turning into a warm, snug haven under the gentle glow of a lamp. Designers know this secret and use it to create special moods that change as the day goes by.</p>
    
        <p>Now, let's talk about the cool trick of neutral colors. They might seem like the background players, but they are like silent superheroes. Neutrals let the bold colors shine, but they also add their own flavor to the room. Soft, warm neutrals can make a room feel comfy and familiar, while cool ones can help us relax. They're like the hidden spices that make a dish taste just right.</p>
    
        <p>Colors also have different meanings in different parts of the world. It's like they speak different languages in different cultures. A color that means happiness in one place could mean something completely different in another. Imagine thinking about these secret meanings when designing a room for people from all over the world – it's like using a language they all understand.</p>
    
        <p>Nature's colors have their own superpowers too. Earthy tones like greens and browns give us a cozy, calm feeling, like we're in a forest or a garden. These colors are like nature's way of saying "hello" inside our rooms. And just like in stories, colors can help us imagine things. Rich colors like royal purples can make us feel like we're in a grand adventure, even when we're just in a room.</p>
    
        <p>Oh, and let's not forget how colors feel when we touch things. Different textures can make colors seem even more interesting. Rough surfaces might make earthy colors feel more rugged, while smooth ones can make bright colors look sleek. It's like adding extra layers to a story, making it more exciting to experience.</p>
    
        <p>So, as you step into different rooms, remember that colors are like magic spells. They make us feel different emotions, take us on journeys, and even speak to us in their own colorful language. Whether it's a cozy corner or a vibrant space, colors are the artists that create feelings and memories, making our world a more exciting place to be.</p>
  
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
  
export default Article3;
