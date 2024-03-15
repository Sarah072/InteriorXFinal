import React from 'react';
import LoginForm from './components/LoginForm';
import Req from './components/Req';
import SignUp from './components/SignUp';
import MoodBoard from './components/MoodBoard';
import ImageUploadAndResize from './components/MoodBoard';
import ProfileSetting from "./components/ProfileSetting";
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EducationInspiration from './components/EducationInspiration';
import EducationInspirationNews from './components/EducationInspirationNews';
import DesignInspirationIdeas from './components/DesignInspirationIdeas';
import DesignTrendsArticle from './components/Articles/DesignIdeas';
import Article2 from './components/Articles/Article2';
import Article3 from './components/Articles/Article3';
import Article4 from './components/Articles/Article4';
import Article5 from './components/Articles/Article5';
import SecondProject from './SecondProject';
import TBench3DModel from './catalog/items/RotatingHouse/rotatingBlock.js';
import CommunityForm from './components/Community';
import FurnitureEstimator from './components/FurnitureEstimator.js';
import FavouriteItems from './components/favouriteItems.js';
import FeedbackForm from './components/colFeedback.js';
import UserRolesPage from './components/rolesAndPermissions.js';
import VRFeedbackForm from './components/VRfeedback.js';
import Professional from './components/Professionals.js';
import DomesticGasBill from './components/DomesticGasBill.js';
import LocalSuppliers from './components/localSuppliers.js';
import ParentComponent from './components/parent.js';
import ChatApp from './components/colChat.js';
import ChatReply from './components/chatReply.js';
import AnnotationComponent from './components/annotations.js';
import ChatbotPro from './components/collaborationChat.js';
import InteriorDesignPins from './components/TrendBoards.js';
import ColTaskDisplay from './components/ColTasks.js';
import ColTaskAssignment from './components/ColTaskAssignment.js';
import ContactForm from './components/contactUs.js';

function App() {
 
  return (
    <div className="app">
      <Router>
      <Routes>
      <Route exact path="/" element={<ProfileSetting />} />
        <Route path="/ImageUploadAndResize" element={<ImageUploadAndResize />} />
        <Route path="/EducationInspirationNews" element={<EducationInspirationNews />} />
        <Route path="/EducationInspiration" element={<EducationInspiration />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Req" element={<Req />} />
        <Route path="/MoodBoard" element={<MoodBoard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/DesignTrendsArticle" element={<DesignTrendsArticle />} />
        <Route path="/Article2" element={<Article2 />} />
        <Route path="/Article3" element={<Article3 />} />
        <Route path="/Article4" element={<Article4 />} />
        <Route path="/Article5" element={<Article5 />} />
        <Route path="/SecondProject" element={<SecondProject />} />
        <Route path="/DesignInspirationIdeas" element={<DesignInspirationIdeas />} />
        <Route path="/ThreeDModel" element={<TBench3DModel />} />
        <Route path="/Community" element={<CommunityForm />} />
        <Route path='/FurnitureEstimator' element={<FurnitureEstimator />} />
        <Route path='/FavouriteItems' element={<FavouriteItems />} />
        <Route path='/FeedbackForm' element={<FeedbackForm />} />
        <Route path='/UserRolesPage' element={<UserRolesPage />} />
        <Route path='/UserRolesPage' element={<VRFeedbackForm />} />
        <Route path='/InteriorDesignPins' element={<InteriorDesignPins />} />
        <Route path='/Professional' element={<Professional />} />
        <Route path='/DomesticGasBill' element={<DomesticGasBill />} />
        <Route path='/LocalSuppliers' element={<LocalSuppliers />} /> 
      
        <Route path='/ParentComponent' element={<ParentComponent />} />
        <Route path='/Reply' element={<ChatReply />} /> 
        <Route path='/ChatApp' element={<ChatApp />} />
        <Route path='/ColTaskDisplay' element={<ColTaskDisplay />} />
        <Route path='/ContactForm' element={<ContactForm />} /> 
        <Route path='/ColTaskAssignment' element={<ColTaskAssignment />} /> 
      
      </Routes>
    </Router>
    </div>
  );
}

export default App;