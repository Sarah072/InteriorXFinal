import React, { useState, useEffect, useRef } from 'react';

const Fans = ({ updateTotalElectricityConsumed }) => {
  const appliances = [
    'Ceiling Fan',
    'Exhaust Fan',
    'Bracket Fan',
  ];


  
  const ratings = [80, 60, 60];
  const indexRef = useRef();
  const [quantities, setQuantities] = useState(appliances.map(() => 0));
  const [days, setDays] = useState(appliances.map(() => 0));
  const [hours, setHours] = useState(appliances.map(() => 0));

const [electricityConsumed, setElectricityConsumed] = useState(
  appliances.map(() => 0)
);


  const [showTable, setShowTable] = useState(false);
  const [showTableFans, setShowTableFans] = useState(false);

  const calculateElectricityConsumed = (index) => {
    const rating = ratings[index];
    const kWh =
    quantities[index] !== 0 && days[index] !== 0 && hours[index] !== 0
    ? (rating * quantities[index] * days[index] * hours[index]) / 1000
    : 0;

      console.log(kWh, quantities[index],days[index], hours[index]);
    setElectricityConsumed((prev) => {
      const newElectricityConsumed = [...prev];
      newElectricityConsumed[index] = kWh.toFixed(3);
      return newElectricityConsumed;
    });
  };

  
  
  const calculateTotalKWh = () => {
    const totalKWh = electricityConsumed.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue),
      0
    );
    return totalKWh.toFixed(3);
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = value;
      return newQuantities;
    });
  
    // Set the captured indexRef value
    indexRef.current = index;
  };
  
  const handleDaysChange = (index, value) => {
    setDays((prev) => {
      const newDays = [...prev];
      newDays[index] = value;
      return newDays;
    });
  
    // Set the captured indexRef value
    indexRef.current = index;
  };
  
  const handleHoursChange = (index, value) => {
    setHours((prev) => {
      const newHours = [...prev];
      newHours[index] = value;
      return newHours;
    });
  
    // Set the captured indexRef value
    indexRef.current = index;
  };
  
  // Use useEffect with indexRef.current as a dependency
  useEffect(() => {
    if (indexRef.current !== undefined) {
      calculateElectricityConsumed(indexRef.current);
    }
  }, [quantities, days, hours]);


  const toggleTableFansVisibility = () => {
    setShowTableFans((prev) => !prev);
  };


// Add state to store the electricity bill for each appliance
const [electricityBill, setElectricityBill] = useState(appliances.map(() => 0));

// Function to calculate the electricity bill for each AC based on slab rates
const calculateElectricityBill = (index) => {
  const kWh = parseFloat(electricityConsumed[index]);

  // Define slab rates
  const slabRates = [
    { upperLimit: 100, rate: 13.48 },
    { upperLimit: 200, rate: 18.95 },
    { upperLimit: 300, rate: 22.14 },
    { upperLimit: 400, rate: 25.53 },
    { upperLimit: 500, rate: 27.74 },
    { upperLimit: 600, rate: 29.16 },
    { upperLimit: 700, rate: 30.30 },
    { upperLimit: Infinity, rate: 35.22 },
  ];

  // Calculate electricity bill based on slab rates
  let totalBill = 0;
  let remainingUnits = kWh;

  for (const slab of slabRates) {
    if (remainingUnits > 0) {
      const unitsInSlab = Math.min(remainingUnits, slab.upperLimit);
      totalBill += unitsInSlab * slab.rate;
      remainingUnits -= unitsInSlab;
    } else {
      break;
    }
  }

  // Update the electricity bill state
  setElectricityBill((prev) => {
    const newElectricityBill = [...prev];
    newElectricityBill[index] = totalBill.toFixed(2);
    return newElectricityBill;
  });
};

// Call calculateElectricityBill whenever electricityConsumed changes
useEffect(() => {
  electricityConsumed.forEach((_, index) => calculateElectricityBill(index));
}, [electricityConsumed]);

// Calculate the total electricity bill for all ACs
const totalElectricityBill = electricityBill.reduce(
  (accumulator, currentValue) => accumulator + parseFloat(currentValue),
  0
).toFixed(2);

// Update the total electricity consumed in the parent component
useEffect(() => {
  updateTotalElectricityConsumed(totalElectricityBill);
}, [totalElectricityBill]);



  return (
    <div>
      <div style={{backgroundColor: 'white', width: '50%', marginLeft: '25%'}}>
<div
        onClick={toggleTableFansVisibility}
        style={{
          cursor: 'pointer',
          padding: '10px',
          border: '1px solid #ccc',
          marginBottom: '10px',
          display: 'inline-block',
          width: '100%',
          backgroundColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <p style={{ color: 'white'}}><b>Fans</b></p>
      </div>

      {showTableFans && (
        <div>
          
  <div style={{ marginTop: '20px' }}>
        <p style={{ color: 'black' }}>
          <b>Total kWh Energy Consumed:</b> {calculateTotalKWh()}
        </p>
       
        <p style={{ color: 'black' }}>
          <b>Total Electricity Bill:</b> Rs. {totalElectricityBill}
        </p>
      </div>
            
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px',
            backgroundColor: 'white',
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Appliances</th>
              <th style={tableHeaderStyle}>Rating (Watts)</th>
              <th style={tableHeaderStyle}>Quantity</th>
              <th style={tableHeaderStyle}>Days</th>
              <th style={tableHeaderStyle}>Hours</th>
              <th style={tableHeaderStyle}>Electric Consumed (kWh)</th>
            </tr>
          </thead>
          <tbody>
          {appliances.map((appliance, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{appliance}</td>
                <td style={tableCellStyle}>{ratings[index]}</td>
                <td style={tableCellStyle}>
                  <input
                    type="number"
                    value={quantities[index]}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td style={tableCellStyle}>
                  <select
                    value={days[index]}
                    onChange={(e) => handleDaysChange(index, e.target.value)}
                    style={selectStyle}
                  >
                    {Array.from({ length: 31 }, (_, i) => i ).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={tableCellStyle}>
                  <select
                    value={hours[index]}
                    onChange={(e) => handleHoursChange(index, e.target.value)}
                    style={selectStyle}
                  >
                    {Array.from({ length: 24 }, (_, i) => i ).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={tableCellStyle}>
                  {electricityConsumed[index] || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
     </div>

    </div>
  );
};
const tableHeaderStyle = {
  padding: '20px',
  backgroundColor: 'grey',
  borderBottom: '1px solid #ddd',
  color: 'black',
  };
  
  const tableCellStyle = {
  
  padding: '20px',
  borderBottom: '1px solid #ddd',
  };
  
  const inputStyle = {
  backgroundColor: 'grey',
  width: '100px',
  };
  
  const selectStyle = {
  backgroundColor: 'grey',
  width: '70px',
  };
  

export default Fans;