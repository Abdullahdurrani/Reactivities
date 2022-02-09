import React, { useEffect } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
	const { activityStore } = useStore();

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	// on page start loading is true so LoadingComponent is returned
	if (activityStore.loadingIntitial) return <LoadingComponent />;

	return (
		<>
			<NavBar />
			<div className="container mt-4">
				<ActivityDashboard />
			</div>
		</>
	);
}

export default observer(App);
