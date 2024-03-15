import React, { useState } from 'react';
import FP from './images/floorPlan.png';
import MC from './images/MC.png';
import BD from './images/bed.png';
import SW from './images/squareWall.png';
import SD from './images/singleDoor.png';
import DD from './images/doubleDoor.png';
import SLD from './images/slidingDoor.png';
import SinW from './images/singleWindow.png';
import DW from './images/doubleWindow.png';
import "./Normalize.css";
import "./HomePage.css";


const SideNav = () => {
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  const toggleFloorPlan = () => {
    setShowFloorPlan(!showFloorPlan);
  };

  const toggleMaterials = () => {
    setShowMaterials(!showMaterials);
  };

  return (
    <div>
    <div class="mainDiv">
    
    <div class="navSection">
    <div class="navSection">
  <nav>
    <ul>
      <li>
        <button class="toggleBtn" onClick={toggleFloorPlan}>
          <img class="FP" src={FP} alt="Floor Plan" />
        </button>
        {showFloorPlan && (
          <div class="floorPlanDiv">
            <ul class="scrollContainer">
              <li>
                <button class="toggleBtn">
                  <img class="SW" src={SW} alt="Wall Structures" />
                </button>
                <p class="draw">Draw Wall Structure</p>
              </li>
              <li>
  <button class="toggleBtn">
    <img class="MC" src={MC} alt="Doors & Windows" />
  </button>
  <p class="draw">Doors & Windows</p>
  <div class="flexDiv">
    <div class="imgDiv">
      <img class="SD" src={SD} alt="Image 1" />
      <p class="singleDoorp">Single <br></br>Door</p>
    </div>
    <div class="imgDiv">
      <img class="DD"src={DD} alt="Image 2" />
      <p class="doubleDoorP">Double<br></br> Door</p>
    </div>
    <div class="imgDiv">
      <img class="SLD" src={SLD} alt="Image 3" />
      <p class="singleDoorp">Sliding <br></br>Door</p>
    </div>
  </div>

  <div class="flexDiv">

  <div class="imgDiv">
    <img class="SinW" src={SinW} alt="Image 4" />
    <p class="singleDoorp">Single <br></br>Window</p>
  </div>

  <div class="imgDiv">
    <img class="DW"src={DW} alt="Image 5" />
    <p class="class">Double<br></br> Window</p>
  </div>
</div>
</li>

            </ul>
          </div>
        )}
      </li>
      <li>
        <button class="toggleBtn" onClick={toggleMaterials}>
          <img class="MC" src={BD} alt="Materials & Components" />
        </button>
        {showMaterials && (
          <div class="materialsDiv">
            <ul class="scrollContainer">
              <li>
                <button class="toggleBtn">
                  <img src="path/to/material1-logo.png" alt="Material 1" />
                </button>
              </li>
              <li>
                <button class="toggleBtn">
                  <img src="path/to/material2-logo.png" alt="Material 2" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </li>
    </ul>
  </nav>
</div>

  
      </div>
      <div class="modelArea">

      </div>
      <div></div>
      </div>
      <div class="footer"></div>
      
    </div>
  );
};

export default SideNav;
