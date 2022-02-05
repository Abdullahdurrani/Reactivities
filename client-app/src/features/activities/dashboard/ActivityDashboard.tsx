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
    editMode: boolean;
    // this is not optional because dashboard contains edit form option only not create => so edit will always contain an id
    handleFormOpen: (id: string) => void;
    handleFormClose: () => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, selectedActivity, handleSelectActivity, handleCancelSelectedActivity,
    editMode, handleFormOpen, handleFormClose, handleCreateOrEditActivity, handleDeleteActivity }: Props) {
    return (
        <div className="row">
            <div className="col-8">
                {/* contains View button which executes the handleSelectActivity function which in return sets the selectedActivity state */}
                <ActivityList activities={activities} handleSelectActivity={handleSelectActivity} handleDeleteActivity = {handleDeleteActivity} />
            </div>
            <div className="col-4">
                {/* selectedActivity is used to show the details of activity which was clicked, handleCancelSelectedActivity is used to cancel viewing details, handleFormOpen to edit activity */}
                {/* if in editMode then hide details, only shows if there is selectedActivity and editMode is false */}
                {selectedActivity && !editMode &&
                    <ActivityDetails activity={selectedActivity} handleCancelSelectedActivity={handleCancelSelectedActivity}
                        handleFormOpen={handleFormOpen}
                    />}
                {/* only show form if in editMode */}
                {editMode &&
                    <ActivityForm activity={selectedActivity} handleFormClose={handleFormClose} handleCreateOrEditActivity={handleCreateOrEditActivity} />}
            </div>
        </div>
    )
}
