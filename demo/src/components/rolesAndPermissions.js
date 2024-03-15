import React, { useState } from 'react';
import './rolesAndPermissions.css';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import ChatbotPro from './collaborationChat';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const UserRolesPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: 'projectLeader', permission: 'read' });
  const [id, setId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  

  const addUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/UserRolesPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newUser,
          projectID: id, 
        }),
       
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const savedUser = await response.json();

      setUsers([...users, savedUser]);
      setNewUser({ username: '', role: '', permission: '' });
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  const handleIdChange = (e) => {
    const newId = e.target.value;
    setId(newId);
    localStorage.setItem('projectID', newId);
  };

  return (
   
    <div className="user-roles-container" style={{width: '100%'}}>
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
      <h2>Roles & Permissions</h2>

      <div className="form-group2">
        <label>Project ID:</label>
        <input style={{width: '100%'}} type="text" name="id" value={id} onChange={handleIdChange}/>
      </div>

      <div className="form-group2">
        <label>Username:</label>
        <input style={{width: '100%'}} type="text" name="username" value={newUser.username} onChange={handleInputChange} />
      </div>
      <div className="form-group2">
        <label>Role:</label>
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="projectLeader">Project Leader</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>
      <div className="form-group2">
        <label>Permission:</label>
        <select name="permission" value={newUser.permission} onChange={handleInputChange}>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="readWrite">Read/Write</option>
        </select>
      </div>
      <button className="add-user-button" onClick={addUser}>
        Add User
      </button>
      <Link to='/ColTaskAssignment'><button className="add-user-button">Assign Tasks to Users</button></Link>
      <div className="user-list">
        <h3>Collaborators List</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Permission</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.permission}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
     
     
 
      <ChatbotPro />
    </div>
  
  );
};

export default UserRolesPage;
