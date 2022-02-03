import React from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
}

export default function ActivityList({ activities, handleSelectActivity }: Props) {
    return (
        <div>
            {activities.map((activity => (
                <div className="card">

                    <h5 className="card-header">{activity.title}</h5>

                    <div className="card-body">

                        <p className="card-text">{activity.date}</p>
                        <h5 className="card-title">{activity.description}</h5>
                        <h6 className="card-title">{activity.city}</h6>

                        <div className="d-flex justify-content-between">
                            <h4> <span className="badge bg-secondary">{activity.category}</span></h4>
                            {/* onclick contains arrow function because as soon as button renders it will try to execute it without clicking. arrow func makes sure it only executes when it is clicked  */}
                            <button onClick={() => handleSelectActivity(activity.id)} type="button" className="btn btn-primary">View</button>
                        </div>

                    </div>
                </div>
            )))}

        </div>
    )
}