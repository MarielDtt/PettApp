import { Iappointment } from "../interfaces/Iappointment";
import { AppointmentStatus } from "../interfaces/Iappointment"


export const PreloadAppointments: Iappointment[] = [
  {
    date: new Date ("2024-10-25"),
    time: "15:00",
    userId: 1,
    status: AppointmentStatus.ACTIVE,
     
  },

  {
    date: new Date ("2024-10-17"),
    time: "14:30",
    status: AppointmentStatus.ACTIVE,
    userId: 2,
  },

  {
    date: new Date ("2024-10-20"),
    time: "09:00",
    status: AppointmentStatus.ACTIVE,
    userId: 3,
  },

  {
    date: new Date ("2024-10-21"),
    time: "11:00",
    status: AppointmentStatus.ACTIVE,
    userId: 3,
  },
];

/*export const appointments: Iappointment[] = [
  {
    id: 1,
    date: "2023/10/05",
    time: "10:30",
    userId: 1, // Refieres al usuario con ID 1
    status: "active"
  },
  {
    id: 2,
    date: "2023/10/15",
    time: "14:30",
    userId: 2, // Refieres al usuario con ID 2
    status: "cancelled"
  }
];*/
