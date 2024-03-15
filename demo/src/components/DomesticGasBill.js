import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import backgroundImage from './images/abstract-gradient-green-light-background-free-vector.png';
import Footer from './footer';

const DomesticGasBill = () => {
  const appliances = [
    'Boilers',
    'Boilers (High Efficiency)',
    'Dryer',
    'Furnace',
    'Furnace (High Efficiency)',
    'Garage Unit Heaters',
    'Gas Fireplace (standard)',
    'Generator (standby)',
    'Outdoor Grill',
    'Pool Heater',
    'Range',
    'Range (Commercial)',
    'Spa Tub',
    'Tank Water Heater',
    'Tankless Water Heater',
  ];

  const ratings = [
    150000,
    120000,
    22000,
    125000,
    87500,
    65000,
    30000,
    250000,
    32500,
    300000,
    60000,
    172500,
    150000,
    47500,
    170000,
  ];

  const indexRef = useRef();
  const [quantities, setQuantities] = useState(appliances.map(() => 0));
  const [days, setDays] = useState(appliances.map(() => 0));
  const [hours, setHours] = useState(appliances.map(() => 0));
  const [electricityConsumed, setElectricityConsumed] = useState(appliances.map(() => 0));

  const calculateElectricityConsumed = (index) => {
    const btuToKWh = ratings[index];

    const consumed =
      quantities[index] !== 0 && days[index] !== 0 && hours[index] !== 0
        ? quantities[index] * days[index] * hours[index] * (btuToKWh/3412) // Assuming 1 BTU/hr = 3412 kWh
        : 0;

    setElectricityConsumed((prev) => {
      const newElectricityConsumed = [...prev];
      newElectricityConsumed[index] = consumed.toFixed(3);
      return newElectricityConsumed;
    });
  };

  const calculateTotalGasBill = () => {
    const totalKWh = electricityConsumed.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue),
      0
    );
    const result = totalKWh * 2; // Assuming $2 per kWh
    return result.toFixed(2);
  };

  const handleQuantityChange = (index, value) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] = value;
      return newQuantities;
    });

    indexRef.current = index;
  };

  const handleDaysChange = (index, value) => {
    setDays((prev) => {
      const newDays = [...prev];
      newDays[index] = value;
      return newDays;
    });

    indexRef.current = index;
  };

  const handleHoursChange = (index, value) => {
    setHours((prev) => {
      const newHours = [...prev];
      newHours[index] = value;
      return newHours;
    });

    indexRef.current = index;
  };

  useEffect(() => {
    if (indexRef.current !== undefined) {
      calculateElectricityConsumed(indexRef.current);
    }
  }, [quantities, days, hours]);

  return (
    <div>
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
          .container {
            margin: 0 auto;
            max-width: 90%;
            margin-top: 10%;
            margin-bottom: 5%;
          }
          .table-container {
            margin-left: auto;
            margin-right: auto;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: white;
          }
          th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: grey;
            color: black;
          }
          input, select {
            width: 100%;
            padding: 8px;
            background-color: grey;
          }
        `}
      </style>
      <div className="container">
        <h1 style={{ color: 'black'}}>Domestic Gas Bill Calculator</h1>

        <div className="table-container">
          <div style={{ marginTop: '20px', paddingTop: '10px' }}>
            <p style={{ color: 'black' }}>
              <b>Total Domestic Bill: Rs. </b> {calculateTotalGasBill()}
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Natural Gas Items</th>
                <th>Typical BTUs/hr</th>
                <th>Quantity</th>
                <th>Days</th>
                <th>Hours</th>
                <th>Electric Consumed (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((appliance, index) => (
                <tr key={index}>
                  <td>{appliance}</td>
                  <td>{ratings[index]}</td>
                  <td>
                    <input
                      type="number"
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={days[index]}
                      onChange={(e) => handleDaysChange(index, e.target.value)}
                    >
                      {Array.from({ length: 31 }, (_, i) => i).map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={hours[index]}
                      onChange={(e) => handleHoursChange(index, e.target.value)}
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{electricityConsumed[index] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DomesticGasBill;
