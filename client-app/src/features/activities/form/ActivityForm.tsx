import React from "react";

export default function ActivityForm() {
    return (
        <div className="p-3 border mt-2" style={{ width: "24rem" }}>
            <form className="me-4 mt-2">
                <div className="mb-3">
                    <input type="text" placeholder="Title" className="form-control" />
                </div>
                <div className="mb-3">
                    <textarea placeholder="Description" className="form-control" rows={3} />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Category" className="form-control" />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Date" className="form-control" />
                </div>
                <div className="mb-3">
                    <input type="text" placeholder="Venue" className="form-control" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </div>

            </form>
        </div>
    )
}
