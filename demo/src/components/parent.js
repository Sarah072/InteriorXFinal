import React, { useState, useEffect } from 'react';
import Fridge from './Fridge';
import Fans from './Fans';
import Computers from './Computers';
import OtherAppliances from './OtherAppliances';
import CarbonFootprintCalculator from './Energy';
import AC from './AC';
import Navbar from './Navbar';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import Footer from './footer';

const ParentComponent = () => {
  const [totalElectricityBill, settotalElectricityBill] = useState(0);

  const updateTotalElectricityConsumed = (value) => {
    settotalElectricityBill((prev) => prev + parseFloat(value));
  };

  return (
   <div>
        <Navbar />

        <div style={{width: '1580px'}}>
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
      <CarbonFootprintCalculator updateTotalElectricityConsumed={updateTotalElectricityConsumed}/>
      <Fridge updateTotalElectricityConsumed={updateTotalElectricityConsumed} />
      <AC updateTotalElectricityConsumed={updateTotalElectricityConsumed}/>
      
      <Fans updateTotalElectricityConsumed={updateTotalElectricityConsumed}/>
      <Computers updateTotalElectricityConsumed={updateTotalElectricityConsumed}/>
      <OtherAppliances updateTotalElectricityConsumed={updateTotalElectricityConsumed}/>
    
      <div style={{backgroundColor: 'white', width: '50%', marginLeft: '25%', paddingTop: '10px', paddingBottom: '10px'}}>
        <p style={{color: 'black'}}>
          <b>Total Electricity Consumed:</b> {totalElectricityBill.toFixed(3)} kWh
        </p>
      </div>
    </div>
    <Footer />
    </div>
  );
};



export default ParentComponent;
