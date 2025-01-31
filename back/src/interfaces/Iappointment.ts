

export enum AppointmentStatus {
    ACTIVE = "active",
    CANCEL = "cancel"
}

export interface Iappointment{
    date: Date,
    time: string,
    userId: number,
    status: AppointmentStatus,
}