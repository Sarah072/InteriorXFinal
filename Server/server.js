
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000; // Update the port if needed
const path = require('path');


// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('uploadsDP'));
app.use('/uploadsDP', express.static(path.join(__dirname, 'uploadsDP')));
// Use CORS middleware to allow requests from the client (frontend)
app.use(cors({
  origin: ['http://localhost:3001','http://localhost:3002'], // Allow requests from the frontend URL
  credentials: true, // Allow cookies to be sent
}));



// Connect to MongoDB Atlas
const DB = 'mongodb+srv://sarahnasir555:Ru0hk4inHIzvSGt0@cluster0.joqh69w.mongodb.net/InteriorX?retryWrites=true&w=majority';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, 
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

  const loginRoutes = require('./Routes/login');
  const signupRoutes = require('./Routes/signup');
  const protectedRoutes = require('./Routes/protected');
  const profileRoutes = require('./Routes/profile');
  const forgotPasswordRoutes = require('./Routes/forgotPassword');
const resetPasswordRoutes = require('./Routes/resetPassword');
const savedDesignsRoute = require('./Routes/savedDesignsRoute');
const postDesignRoutes = require('./Routes/savedDesignsRoute');
const articleCommentRoute = require('./Routes/articleCommentRoute'); 
const userLikesRoutes = require('./Routes/userLikesRoute');
const profilePictureRoute = require('./Routes/ProfilePictureRoute');
const community = require('./Routes/api');
const likeImageRoute = require('./Routes/likeImageRoute');
const projectRoomRoute = require('./Routes/projectRoomsRoute');
const userPrevDesignRoute = require('./Routes/UserPrevDesignRoute');
const favRoutes = require('./Routes/favRoutes');  
const itemRating = require('./Routes/ItemRatingRoutes');
const itemReviews = require('./Routes/itemReviewRoutes');
const colFeedback = require('./Routes/colFeedbackRoutes');
const UserRolesPage = require('./Routes/rolesAndPermissionsRoute');
const VRfeedback = require('./Routes/VRfeedbackRoutes');
const Professionals = require('./Routes/ProfessionalRoutes');
const chatPro = require('./Routes/ChattingProRoute');
const collab = require('./Routes/collabRoutes');
const proChatFinal = require('./Routes/proChatFinal');
const googleMaps = require('./Routes/googleMapsRoutes');
const Task = require('./Routes/TaskAssignmentRoutes');
const annotation = require('./Routes/annotationRoute');
const contactRoutes = require('./Routes/contactRoutes');

app.use('/api/places', googleMaps);
app.use('/proChat', proChatFinal);
app.use('/task', Task);
app.use('/annotation', annotation);
app.use('/contactUs', contactRoutes);

  app.use('/login', loginRoutes);
  app.use('/signup', signupRoutes);
  app.use('/api', protectedRoutes);
  app.use('/profile', profileRoutes);
  app.use('/reset-password', forgotPasswordRoutes); 
  app.use('/reset', resetPasswordRoutes); 
  app.use('/api/getSavedDesigns', savedDesignsRoute);
  app.use('/postDesign', postDesignRoutes);
  app.use('/api/comments2', articleCommentRoute);
  app.use('/api/userLikes', userLikesRoutes);
  app.use('/api/upload-profile-pic', profilePictureRoute);
  app.use('/api/fetch-profile', profilePictureRoute);
  app.use('/api/fetch-profile2', profilePictureRoute);
  app.use('/api/uploadImage', community);
  app.use('/api/getImages', community);
  app.use('/api/likeImage', likeImageRoute);
  app.use('/api/projectRooms', projectRoomRoute);
  app.use('/api/projectRoomsPost', projectRoomRoute);
  app.use('/api/userPrevDesignRoute', userPrevDesignRoute);
  app.use('/favRoutes', favRoutes);
  app.use('/itemRating', itemRating);
  app.use('/itemReviews', itemReviews);
  app.use('/colFeedback', colFeedback); 
  app.use('/UserRolesPage', UserRolesPage);
  app.use('/VRfeedback', VRfeedback); 
  app.use('/Professionals', Professionals); 
  app.use('/chatPro', chatPro); 
  app.use('/collab', collab); 

  

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });





















