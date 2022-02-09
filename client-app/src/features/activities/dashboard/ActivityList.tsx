import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
	const { activityStore } = useStore();
	const { selectActivity, deleteActivity, activitiesArray, loading } = activityStore;
	// contains the name of the button clicked
	const [target, setTarget] = useState("");

	function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}
	return (
		<div>
			{activitiesArray.map((activity) => (
				<div key={activity.id} className="card">
					<h5 className="card-header">{activity.title}</h5>

					<div className="card-body">
						<p className="card-text">{activity.date}</p>
						<h5 className="card-title">{activity.description}</h5>
						<h6 className="card-title">{activity.city}</h6>

						<div className="d-flex justify-content-between">
							<h4>
								{" "}
								<span className="badge bg-secondary">{activity.category}</span>
							</h4>
							<div>
								{/* onclick contains arrow function because as soon as button renders it will try to execute it without clicking. arrow func makes sure it only executes when it is clicked  */}
								<button
									onClick={() => selectActivity(activity.id)}
									type="button"
									className="btn btn-primary me-2"
								>
									View
								</button>
								<button
									name={activity.id}
									onClick={(e) => handleActivityDelete(e, activity.id)}
									type="button"
									className="btn btn-danger"
								>
									Delete
									{loading && target === activity.id && (
										<span
											className="spinner-border spinner-border-sm ms-2"
											role="status"
											aria-hidden="true"
										></span>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
});
