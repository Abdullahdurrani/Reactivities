import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Container, ListGroup, Navbar } from 'react-bootstrap';
import { FaUserFriends } from 'react-icons/fa';


function App() {

  // activities are populated by api
  const [activities, setActivities] = useState([]);

  // gets a response from api and if it is successful, it populates the activities array
  // an empty array parameter is used to run it only once
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <div>
      <h1><FaUserFriends size="1.5em"/>Reactivities</h1>
        <ListGroup>
          {activities.map((activity: any) => (
            <ListGroup.Item key={activity.id}>
              {activity.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      
    </div>
  );
}

export default App;
