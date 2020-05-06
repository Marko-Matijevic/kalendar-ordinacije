import React, {Component} from "react";
import {generateSchedule} from "../helpers";
import "./Calendar.css"
import ScheduleSelection from "../ScheduleSelection/ScheduleSelection";
import DaySchedule from "./components/DaySchedule"
import Workours from "./components/Workours";
import CalendarHeader from "./components/CalendarHeader";
import CalendarColors from "./components/CalendarColors";

export class Calendar extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userSchedules: [],
            schedule: generateSchedule(),
            currentReservation: {
                day: "",
                appointment: -1,
                time: ""
            }
        }
    }

    resetCurrentReservation = () => {
        const {currentReservation} = this.state;

        currentReservation.day = "";
        currentReservation.appointment = -1;
        currentReservation.time = "";

        this.setState({currentReservation});
    }

    updateSchedule = () => {

        const {schedule, currentReservation} = this.state;

        for (let workDay of schedule) {
            if (workDay.weekday === currentReservation.day) {
                workDay.appointments[currentReservation.appointment - 1].availability = false
            }
        }

        this.setState({schedule})
    }

    updateUserSchedules = () => {
        const {userSchedules, currentReservation} = this.state;

        const reservation = {
            day: currentReservation.day,
            appointment: currentReservation.appointment,
            time: currentReservation.time
        }

        userSchedules.push(reservation);
        this.setState({userSchedules});
    }

    updateScheduleOnDelete = (index: number) => {
        const {schedule, userSchedules} = this.state;
        const deletedUserSchedule = userSchedules[index];

        for (let workDay of schedule) {
            if (workDay.weekday === deletedUserSchedule.day) {
                workDay.appointments[deletedUserSchedule.appointment - 1].availability = true;
            }
        }
        this.setState({schedule});
    }

    handleFormChange = (evt: any) => {
        const {currentReservation} = this.state;

        if (evt.target.name === "appointment") {
            const [appointment, time] = evt.target.value.split(",");
            //FOR SAVING TIME AND APPOINTMENT
            currentReservation[evt.target.name] = parseInt(appointment);
            currentReservation.time = time;

        } else {
            currentReservation[evt.target.name] = evt.target.value;
        }
        this.setState({currentReservation});
    };

    handleFormDelete = (index: number) => {
        const {userSchedules} = this.state;
        this.updateScheduleOnDelete(index);

        userSchedules.splice(index, 1);
        this.setState({userSchedules});
    }

    handleFormSubmit = (evt: any) => {
        evt.preventDefault();
        this.updateUserSchedules();
        this.updateSchedule();
        this.resetCurrentReservation();
    };

    renderDaySchedule() {
        const {schedule} = this.state;
        return schedule.map((schedule: any, index: number) => {
                return (<div key={index} className="table-row w-12-5 h-100">
                        <DaySchedule schedule={schedule}/>
                    </div>
                )
            }
        )
    }

    render() {
        return (
            <div className="container-fluid main border border-dark">
                <div className="row h-100">
                    <div className="col-xl-9 col-lg-12 p-0 border-right border-dark">
                        <div className="d-flex flex-column">
                            <div className="border-bottom border-dark text-center py-2">
                                <h1 className="m-0">HOSPITAL CALENDAR</h1>
                            </div>
                            <div className="p-2 border-bottom border-dark">
                                <CalendarColors/>
                            </div>
                            <div className="border-bottom border-dark">
                                <CalendarHeader/>
                            </div>

                            <div className="d-flex calendar-table">
                                <div className="w-12-5 h-100">
                                    <Workours/>
                                </div>
                                {this.renderDaySchedule()}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-12 h-100 schedule-border">
                        <ScheduleSelection userSchedules={this.state.userSchedules}
                                           schedule={this.state.schedule}
                                           selectedDay={this.state.currentReservation.day}
                                           selectedAppointment={this.state.currentReservation.appointment}
                                           change={this.handleFormChange} submit={this.handleFormSubmit}
                                           deleteUserSchedule={this.handleFormDelete}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
