import React from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activities: Activity[];
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, handleSelectActivity, handleDeleteActivity }: Props) {
    return (
        <div>
            {activities.map((activity => (
                <div key={activity.id} className="card" >

                    <h5 className="card-header">{activity.title}</h5>

                    <div className="card-body">

                        <p className="card-text">{activity.date}</p>
                        <h5 className="card-title">{activity.description}</h5>
                        <h6 className="card-title">{activity.city}</h6>

                        <div className="d-flex justify-content-between">
                            <h4> <span className="badge bg-secondary">{activity.category}</span></h4>
                            <div>
                                {/* onclick contains arrow function because as soon as button renders it will try to execute it without clicking. arrow func makes sure it only executes when it is clicked  */}
                                <button onClick={() => handleSelectActivity(activity.id)} type="button" className="btn btn-primary me-2">View</button>
                                <button onClick={() => handleDeleteActivity(activity.id)} type="button" className="btn btn-danger">Delete</button>
                            </div>

                        </div>

                    </div>
                </div>
            )))}

        </div>
    )
}