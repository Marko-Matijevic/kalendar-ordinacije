import React, {Component} from "react";
import IWorkDay from "../../interfaces/IWorkDay";
import UserSchedulesList from "./components/UserSchedulesList";
import SelectionInput from "./components/SelectionInput";

export default class ScheduleSelection extends Component<any, any> {

    filterAvailableWorkDays = () => {
        const {schedule, userSchedules} = this.props;

        if (userSchedules.length > 0) {
            let result = [];
            for (let userSchedule of userSchedules) {
                for (let workDay of schedule) {
                    if (workDay.shift !== "none" && workDay.weekday !== userSchedule.day) {
                        result.push(workDay);
                    }
                }
            }
            return result;
        }

        return schedule.filter((workDay: IWorkDay) => {
            return workDay.shift !== "none"
        })
    }

    render = () => {
        return (
            <div className="h-100">
                <div className="row h-50 pt-3">
                    <div className="col-12">
                        <h4>Select a schedule</h4>
                    </div>
                    <div className="col-12">
                        <SelectionInput userSchedules={this.props.userSchedules} selectedDay={this.props.selectedDay}
                                        selectedAppointment={this.props.selectedAppointment} change={this.props.change}
                                        submit={this.props.submit} availableDays={this.filterAvailableWorkDays()}/>
                    </div>
                </div>
                <div className="row h-50 mb-5">
                    <div className="col-12">
                        <UserSchedulesList userSchedules={this.props.userSchedules}
                                           deleteUserSchedule={this.props.deleteUserSchedule}/>
                    </div>
                </div>
            </div>

        )
    }
}
