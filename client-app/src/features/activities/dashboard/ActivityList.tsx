import React from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
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
                            <a href="#view" className="btn btn-primary w-5">View</a>
                        </div>

                    </div>
                </div>
            )))}

        </div>
    )
}