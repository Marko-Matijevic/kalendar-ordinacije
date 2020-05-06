import IAppointment from "./IAppointment";

export default interface IWorkDay {
    weekday: string,
    day: number,
    month: string,
    shift: "morning" | "afternoon" | "none",
    appointments: Array<IAppointment>
}

