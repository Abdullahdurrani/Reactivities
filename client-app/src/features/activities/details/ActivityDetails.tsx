import React from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
	const { activityStore } = useStore();
	const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

	// to remove the error of undefined
	if (!activity) return <LoadingComponent />;
	return (
		<div className="card" style={{ width: "24rem" }}>
			<img
				className="card-img-top"
				src={require(`../../../assets/categoryImages/${activity.category}.jpg`)}
				alt="image1"
			/>
			<div className="card-body">
				<h5 className="card-title">{activity.title} </h5>
				<p className="card-text">{activity.description}</p>
			</div>
			<div className="card-body d-flex">
				<a
					href="#Edit"
					onClick={() => openForm(activity.id)}
					className="btn btn-outline-primary flex-fill"
				>
					Edit
				</a>
				{/* because we dont use parameters it will wait for click event */}
				<a
					href="#Cancel"
					onClick={cancelSelectedActivity}
					className="btn btn-outline-secondary flex-fill"
				>
					Cancel
				</a>
			</div>
		</div>
	);
}
