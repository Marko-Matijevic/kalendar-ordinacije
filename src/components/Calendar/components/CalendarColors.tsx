import React from "react";

export default function CalendarColors() {
    return (
        <div className="row w-100 h-100 justify-content-center align-items-center p-0 m-0">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-1 h-100 calendar-colors">
                <div className="square working-hour"></div>
                <span>Available</span>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-1 h-100 calendar-colors">
                <div className="square reserved-hour"></div>
                <span>Reserved</span>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-1 h-100 calendar-colors">
                <div className="square break-hour"></div>
                <span>Break</span>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-1 h-100 calendar-colors">
                <div className="square non-working-hour "></div>
                <span>Closed</span>
            </div>
        </div>
    )
}
