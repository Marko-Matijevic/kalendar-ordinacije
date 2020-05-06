import React from "react";
import IWorkDay from "../../../interfaces/IWorkDay";
import IAppointment from "../../../interfaces/IAppointment";
import {generateAfternoonShift, generateMorningShift} from "../../helpers";

export default function SelectionInput(props: any) {
    ;
    const {availableDays, selectedDay} = props;

    const displayDayDropown = () => {
        return (
            <div className="mb-3">
                <label className="mr-2" htmlFor="day">Select a day</label>
                <select className="custom-select w-50" onChange={props.change} id="day" name="day"
                        value={props.selectedDay}>
                    <option value=""></option>
                    {availableDays.map((workDay: IWorkDay, index: number) => <option key={index}
                                                                                     value={workDay.weekday}>{workDay.weekday}</option>)}
                </select>
            </div>
        )
    }

    const getSelectedWorkDay = (workDays: Array<IWorkDay>, selectedDay: string) => {
        return workDays.filter((workDay: IWorkDay) => workDay.weekday === selectedDay)
    }

    const filterAvailableWorkHours = () => {
        const selectedWorkDay = getSelectedWorkDay(availableDays, selectedDay);
        const availableWorkHours = selectedWorkDay[0].appointments.filter((appointment: IAppointment) => appointment.availability === true)

        return availableWorkHours;
    }

    const displayAvailableAppointments = () => {
        const availableHours = filterAvailableWorkHours();

        return (
            <div className="mb-3">
                <label className="mr-2" htmlFor="appointment">Select appointment</label>
                <select className="custom-select w-50" onChange={props.change} id="appointment" name="appointment"
                        disabled={isAppointmentDropdownDisabled()}>
                    <option value={-1}></option>
                    {/* saving 2 values for displaying in the list id + time*/}
                    {availableHours.map((appointment: IAppointment, index: number) => <option key={index}
                                                                                              value={[appointment.id, displayTimeForAppointment(index)]}>{displayTimeForAppointment(index)}</option>)}
                </select>
            </div>
        )
    }

    const displayTimeForAppointment = (index: number) => {
        const selectedWorkDay = getSelectedWorkDay(availableDays, selectedDay);
        let timesArr: any = [];

        if (selectedWorkDay[0].shift === "morning") {
            const morningShift: any = generateMorningShift();

            for (let appointment of selectedWorkDay[0].appointments) {
                for (let hour in morningShift) {
                    if (appointment.availability === true && appointment.id === morningShift[hour].id) {
                        timesArr.push(morningShift[hour].time);
                    }
                }
            }
            return timesArr[index];
        }

        if (selectedWorkDay[0].shift === "afternoon") {
            const afternoonShift: any = generateAfternoonShift();

            for (let appointment of selectedWorkDay[0].appointments) {
                for (let hour in afternoonShift) {
                    if (appointment.availability === true && appointment.id === afternoonShift[hour].id) {
                        timesArr.push(afternoonShift[hour].time);
                    }
                }
            }
            return timesArr[index];
        }

    }

    const isAppointmentDropdownDisabled = () => {
        const {selectedDay} = props;

        if (selectedDay.length > 0) {
            return false;
        }

        return true;
    }

    const isSubmitDisabled = () => {

        const {selectedDay, selectedAppointment} = props;

        if (selectedDay.length > 0 && selectedAppointment > 0) {
            return false;
        }

        return true;
    }

    const renderForm = () => {
        if (props.userSchedules.length < 2) {
            return (
                <form onSubmit={props.submit}>

                    {displayDayDropown()}

                    {selectedDay && displayAvailableAppointments()}

                    <input className="btn btn-block btn-light mb-5" type="submit" value="Submit"
                           disabled={isSubmitDisabled()}></input>
                </form>
            )
        }

        return <div className="my-5 mx-auto text-center font-weight-bold text-danger"><h5>You have 2 reservations this
            week!!</h5></div>
    }

    return (
        <div>
            {renderForm()}
        </div>
    )
}
