import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaterialPage = () => {
  const [materials, setMaterials] = useState([]);
  const [showMaterialMenu, setShowMaterialMenu] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('/api/materials');
      setMaterials(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaterialOptionClick = () => {
    setShowMaterialMenu(!showMaterialMenu);
  };

  return (
    <div className="material-page">
      <h1>Material Page</h1>
      <div className="option" onClick={handleMaterialOptionClick}>
        Materials
        {showMaterialMenu && (
          <div className="material-menu">
            <ul>
              {materials.map((material) => (
                <li key={material._id}>{material.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialPage;
