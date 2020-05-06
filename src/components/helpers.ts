import IAppointment from "../interfaces/IAppointment";
import IDay from "../interfaces/IDay";
import IWorkDay from "../interfaces/IWorkDay";

const APPOINTMENT_NUM: number = 12;
const BREAK_HOUR: number = 7;
const RANDOM_APPOINTMENTS = 15;
const weekdays: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const appointmentsArr: Array<string> = [
    "8:00 - 8:30",
    "8:30 - 9:00",
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00",
    "18:00 - 18:30",
    "18:30 - 19:00"
]

export function generateMorningShift(): Array<object> {
    let morningShift = [];
    for (let i = 0; i < APPOINTMENT_NUM; i++) {
        morningShift.push({id: i + 1, time: appointmentsArr[i]})
    }

    return morningShift;
}

export function generateAfternoonShift(): Array<object> {
    let afternoonShift = [];
    for (let i = 0; i < APPOINTMENT_NUM; i++) {
        afternoonShift.push({id: i + 1, time: appointmentsArr[i + 10]})
    }
    return afternoonShift;
}

function MonthAsString(index: number): string {
    return months[index];
}

function DayAsString(index: number): string {
    return weekdays[index];
}

export function generateWorkWeek(): Array<IDay> {
    const today = new Date();
    const tomorrow = new Date(today);

    let workWeek: IDay[] = [];

    for (let i = 0; i < 7; i++) {

        tomorrow.setDate(tomorrow.getDate() + 1);

        workWeek.push({
            weekday: DayAsString(tomorrow.getDay()),
            day: tomorrow.getDate(),
            month: MonthAsString(tomorrow.getMonth())
        })
    }

    return workWeek;
}

export function generateSchedule(): Array<IWorkDay> {
    const workWeek = generateWorkWeek();
    let schedule: Array<IWorkDay> = [];

    for (let workDay of workWeek) {
        schedule.push({
            weekday: workDay.weekday,
            day: workDay.day,
            month: workDay.month,
            shift: generateShift(workDay),
            appointments: generateAppointment(workDay)
        })
    }

    schedule = generateRandomAppointments(schedule);

    return schedule;
}

function checkIfDayEven(day: number): boolean {

    if (day % 2 === 0) {
        return true;
    }

    return false;
}

function isNonWorkingDay(weekday: string, isEven: boolean): boolean {
    if (weekday === "Sunday" || (weekday === "Saturday" && !isEven)) {
        return true;
    }
    return false;
}

function generateShift(workDay: IDay): "morning" | "afternoon" | "none" {

    const isDayEven: boolean = checkIfDayEven(workDay.day);
    const nonWorkingDay: boolean = isNonWorkingDay(workDay.weekday, isDayEven)

    if (nonWorkingDay) {
        return "none"
    }

    return isDayEven ? "morning" : "afternoon"
}

function generateAppointment(workDay: IDay): Array<IAppointment> {
    let appointments: Array<IAppointment> = [];

    const isDayEven: boolean = checkIfDayEven(workDay.day);
    const nonWorkingDay: boolean = isNonWorkingDay(workDay.weekday, isDayEven)

    for (let i = 0; i < APPOINTMENT_NUM; i++) {

        if (!nonWorkingDay) {

            if (i === (BREAK_HOUR - 1)) {
                appointments.push({
                    id: i + 1,
                    availability: "break"
                })
                continue;
            }

            appointments.push({
                id: i + 1,
                availability: true
            })
        }

    }
    return appointments;
}

export function generateRandomAppointments(schedule: Array<IWorkDay>): Array<IWorkDay> {

    let randomGeneratedSchedules = [];

    while (randomGeneratedSchedules.length < RANDOM_APPOINTMENTS) {
        const randomDay = Math.floor((Math.random() * 7));
        const randomAppointment = Math.floor((Math.random() * 12));

        if (schedule[randomDay].shift !== "none" && schedule[randomDay].appointments[randomAppointment].availability === true) {

            schedule[randomDay].appointments[randomAppointment].availability = false;
            randomGeneratedSchedules.push([randomDay, randomAppointment]);
        }

    }

    return schedule;
}
