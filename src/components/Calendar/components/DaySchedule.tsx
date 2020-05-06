import React from "react";
import IAppointment from "../../../interfaces/IAppointment";

export default function DaySchedule(props: any) {

    //Get prop from the parent about day appointment
    const schedule = props.schedule;


    function renderMorningShift() {
        const appointments = schedule.appointments;
        return (<div className="h-100">
            {appointments.map((availability: IAppointment) => checkHourAvailability(availability))}
            {[...Array(10)].map((x, i) => <div key={i} className="hour-cell non-working-hour">&nbsp;</div>)}
        </div>)
    }

    function renderAfternoonShift() {
        const appointments = schedule.appointments;
        return (
            <div className="h-100">
                {[...Array(10)].map((x, i) => <div key={i} className="hour-cell non-working-hour">&nbsp;</div>)}
                {appointments.map((availability: IAppointment) => checkHourAvailability(availability))}
            </div>
        )
    }

    function renderNonWorkingDay() {
        return (
            <div className="h-100">
                {[...Array(22)].map((x, i) => <div key={i} className="hour-cell non-working-hour">&nbsp;</div>)}
            </div>
        )
    }

    function checkShift() {
        switch (schedule.shift) {
            case "morning":
                return renderMorningShift();
            case "afternoon":
                return renderAfternoonShift();
            case "none":
                return renderNonWorkingDay();
        }
    }

    function checkHourAvailability(appointment: IAppointment) {
        if (appointment.availability === true) {
            return <div key={appointment.id} className="hour-cell working-hour">&nbsp;  </div>
        }

        if (appointment.availability === false) {
            return <div key={appointment.id} className="hour-cell reserved-hour">&nbsp;  </div>
        }

        if (appointment.availability === "break") {
            return <div key={appointment.id} className="hour-cell break-hour">&nbsp;  </div>
        }
    }


    return (
        <div className="h-100 w-100">
            {checkShift()}
        </div>

    )
}
