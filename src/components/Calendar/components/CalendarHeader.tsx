import React from "react";
import {generateWorkWeek} from "../../helpers";

export default function CalendarHeader() {

    function renderWorkWeek() {
        const days = [...generateWorkWeek()];

        return days.map((day, index) => {
            return ([<div key={index} className="d-flex h-100 navigation-item flex-column justify-content-center">
                <div className="full-text">
                    <span>{day.weekday},</span>
                    <span>{day.day}</span>
                </div>

                <div className="short-text">
                    <span>{day.weekday.substr(0, 3)},</span>
                    <span>{day.day}</span>
                </div>
            </div>]);

        })
    }

    return (
        <div className="row m-0">
            <div className="col-12 d-flex justify-content-center align-items-center p-0">
                <div className="d-flex h-100 flex-column navigation-item justify-content-center">
                    <div className="full-text">
                        <span>Work hours</span>
                    </div>

                    <div className="short-text">
                        <span>Hours</span>
                    </div>
                </div>
                {renderWorkWeek()}
            </div>
        </div>
    )
}
