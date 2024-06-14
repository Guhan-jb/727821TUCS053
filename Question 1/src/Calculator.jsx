
import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MzQ4MDE0LCJpYXQiOjE3MTgzNDc3MTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM1YWE3ZjEzLTA1YWEtNDBkNi04ZTY3LWRkODM3MDA0MWE2NCIsInN1YiI6IjcyNzgyMXR1Y3MwNTNAc2tjdC5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJHdWhhbiIsImNsaWVudElEIjoiMzVhYTdmMTMtMDVhYS00MGQ2LThlNjctZGQ4MzcwMDQxYTY0IiwiY2xpZW50U2VjcmV0IjoielJpRERmZnFPUUxVVGhtTSIsIm93bmVyTmFtZSI6Ikd1aGFuIEogQiIsIm93bmVyRW1haWwiOiI3Mjc4MjF0dWNzMDUzQHNrY3QuZWR1LmluIiwicm9sbE5vIjoiNzI3ODIxdHVjczA1MyJ9.LAHYtNx3ocXUI9JWEjMsnHUpNWSFUYnrZg30rbphUO4";

const authheader = `Bearer ${token}`;

const headers = {
  'Authorization': authheader,
  'Content-Type': 'application/json',
};
  const [numberId, setNumberId] = useState('');
  const [id,setId]=useState('')
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
      setError('Invalid number ID. Please use p, f, e, or r.');
      return;
    }
    if(numberId==='p')
      setId("primes")
    if(numberId==='f')
      setId("fibo")
    if(numberId==='e')
      setId("even")
    if(numberId==='r')
      setId("rand")
    

    try {
      const res = await axios.get(`http://20.244.56.144/test/${id}`,headers);
      setResponse(res.data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={numberId}
          onChange={handleInputChange}
          placeholder="Enter number ID (p, f, e, r)"
        />
        <button type="submit">Calculate</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Result</h2>
          <p>Previous State: {JSON.stringify(response.windowPrevState)}</p>
          <p>Current State: {JSON.stringify(response.windowCurrState)}</p>
          <p>Numbers: {response.numbers.join(', ')}</p>
          <p>Average: {response.avg}</p>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
