import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  // activities are populated by api
  const [activities, setActivities] = useState<Activity[]>([]);

  // to handle the show details of activity
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  // to handle the edit/create form show/hide
  const [editMode, setEditMode] = useState(false);

  // gets a response from api and if it is successful, it populates the activities array
  // an empty array parameter is used to run it only once
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  // finds the activity with passed id, then sets the selectedActivity to that activity found
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  // sets the value of selectedActivity to undefined
  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  // Form can be opened for create => which doesnt contain id
  // form can be opened for edit => contains id
  // hence optional id
  function handleFormOpen(id?: string) {
    // 
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  // if contains id => edited data then pass a new array with filtered data. 
  // filter creates array without the activity passed
  // then the new activity is added to the array. otherwise with no id only adds the new activity object to array using spread syntax
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);
    // this closes the form
    setEditMode(false);
    // this shows the details tab
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    // create new array with id passed object removed
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <>

      <NavBar handleFormOpen={handleFormOpen} />

      <div className='container mt-4'>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectActivity={handleSelectActivity}
          handleCancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleCreateOrEditActivity = {handleCreateOrEditActivity}
          handleDeleteActivity = {handleDeleteActivity}
        />
      </div>

    </>
  );
}

export default App;
