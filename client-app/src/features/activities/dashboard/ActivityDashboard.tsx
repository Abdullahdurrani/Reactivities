import React from "react";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    // takes id as parameter and returns void
    handleSelectActivity: (id: string) => void;
    handleCancelSelectedActivity: () => void;
}

export default function ActivityDashboard({ activities, selectedActivity, handleSelectActivity, handleCancelSelectedActivity }: Props) {
    return (
            <div className="row">
                <div className="col-8">
                    {/* contains View button which executes the handleSelectActivity function which in return sets the selectedActivity state */}
                    <ActivityList activities={activities} handleSelectActivity= {handleSelectActivity}/>
                </div>
                <div className="col-4">
                    {/* selectedActivity is used to show the details of activity which was clicked, handleCancelSelectedActivity is used if user want to cancel viewing details */}
                    {selectedActivity &&
                        <ActivityDetails activity={selectedActivity} handleCancelSelectedActivity= {handleCancelSelectedActivity}/>}
                        <ActivityForm />
                </div>
            </div>
    )
}
