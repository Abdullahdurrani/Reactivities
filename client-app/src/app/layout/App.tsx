import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  // activities are populated by api
  const [activities, setActivities] = useState<Activity[]>([]);

  // gets a response from api and if it is successful, it populates the activities array
  // an empty array parameter is used to run it only once
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <>

      <NavBar />

      <div className='container mt-4'>
        <ActivityDashboard activities={activities} />
      </div>

    </>
  );
}

export default App;
