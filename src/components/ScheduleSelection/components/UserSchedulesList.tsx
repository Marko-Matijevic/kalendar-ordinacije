import React from "react";

export default function UserSchedulesList(props: any) {

    const displayUserSchedules = () => {
        const userSchedules = props.userSchedules;
        if (userSchedules.length > 0) {
            return userSchedules.map((schedule: any, index: number) => {
                return <li className="list-group-item d-flex align-items-center justify-content-between"
                           key={index}>{index + 1}: {schedule.day} - {schedule.time}
                    <button className="btn btn-danger ml-auto" onClick={() => props.deleteUserSchedule(index)}>X
                    </button>
                </li>
            })
        }
    }

    return (
        <div>
            <h4>Weekly schedule <span className="font-weight-bold">{props.userSchedules.length}/2</span></h4>
            <ul className="list-group">
                {displayUserSchedules()}
            </ul>
        </div>
    );
}
