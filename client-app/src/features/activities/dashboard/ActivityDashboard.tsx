import React from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore();
	const { editMode, selectedActivity } = activityStore;

	return (
		<div className="row">
			<div className="col-8">
				{/* contains View button which executes the handleSelectActivity function which in return sets the selectedActivity state */}
				<ActivityList />
			</div>
			<div className="col-4">
				{/* selectedActivity is used to show the details of activity which was clicked, handleCancelSelectedActivity is used to cancel viewing details, handleFormOpen to edit activity */}
				{/* if in editMode then hide details, only shows if there is selectedActivity and editMode is false */}
				{selectedActivity && !editMode && <ActivityDetails />}
				{/* only show form if in editMode */}
				{editMode && <ActivityForm />}
			</div>
		</div>
	);
});
