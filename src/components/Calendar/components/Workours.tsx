import React from "react";
import {appointmentsArr} from "../../helpers";

export default function Workours() {

    function renderAppointments() {
        return appointmentsArr.map((appointment, index) => {
            return <li key={index}
                       className="hour-cell d-flex justify-content-center align-items-center">{appointment}</li>
        })
    }

    return (
        <ul className="Workours h-100 flex-column justify-content-evenly">
            {renderAppointments()}
        </ul>
    )
}
