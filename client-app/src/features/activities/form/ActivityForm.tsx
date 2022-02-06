import React, { ChangeEvent, useState } from "react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity | undefined;
    handleFormClose: () => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
}

// activity: selectedActivity means reference activity as selectedActivity
export default function ActivityForm({activity: selectedActivity, handleFormClose, handleCreateOrEditActivity}: Props) {
    
    // on edit activity will be populated and assigned to initialState
    // otherwise initialize it with the following fields
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    // type Obj = typeof initialState;

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        handleCreateOrEditActivity(activity);
    }

    // event can be of input or textarea
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        // destructuring properties => gets name and value attribute from input element and creates their variables (their specific names matter e.g names will not work because it is not an attribute of input element) 
        const {name, value} = event.target;
        // ...activity unpacks all properties and [name] finds the property and sets its value to 'value' variable, name and variable are created above using destructuring props
        setActivity({...activity, [name]: value})
    }

    // OR a different approach
    function handleInput(key: string, value: any) {
        setActivity(activity => ({...activity, [key]: value}));
    }

    // OR third approach with typed safety
    // function handleChange<TKey extends keyof Obj>(key: TKey, value: Obj[TKey]) {
    //     setActivity(activity => ({...activity, [key]: value}));
    // }
    
    return (
        <div className="p-3 border mt-2" style={{ width: "24rem" }}>
            <form onSubmit={handleSubmit} autoComplete='off' className="me-4 mt-2">
                <div className="mb-3">
                    {/* onchange changes the value of title property and that changed property is put into value */}
                    <input type="text" placeholder="Title" className="form-control" name="title" value={activity.title} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <textarea placeholder="Description" className="form-control" rows={3} name="description" value={activity.description} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Category" className="form-control" name="category" value={activity.category} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <input type="date" placeholder="Date" className="form-control" value={activity.date}  onChange={(e) => handleInput("date", e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Venue" className="form-control" value={activity.venue} onChange={(e) => handleInput("venue", e.target.value)} />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button onClick={handleFormClose} type="button" className="btn btn-secondary">Cancel</button>
                </div>

            </form>
        </div>
    )
}
