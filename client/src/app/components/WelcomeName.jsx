import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomeName = ({ contact }) => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchFirstName = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/accounts?contactnum=${contact}`);
        if (response.data.length > 0) {
          const user = response.data[0];
          setFirstName(user.first_name);
        }
      } catch (error) {
        console.error('Error fetching first name:', error);
      }
    };

    fetchFirstName();
  }, [contact]);

  return (
    <div>
      {firstName ? (
        <div>Welcome, {firstName}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WelcomeName;
