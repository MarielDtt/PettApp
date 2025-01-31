export const validateAppointments  = (input) => {
    const error= {};


    if(!input.date) {
        error.date = "Campo Requerido"
    }

    if(!input.time) {
        error.time = "Campo Requerido"
    }

    if (input.date && input.time) {
        const selectedDate = new Date(`${input.date}T${input.time}`);
        const dayOfWeek = selectedDate.getDay(); // 0 (Domingo) - 6 (Sábado)
        const hour = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();

        // Verificar si es de lunes (1) a viernes (5)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            error.date = "Los turnos solo se pueden pedir de lunes a viernes.";
        }

        // Verificar que esté en el rango horario 09:30 a 17:30
        if ((hour < 9 || hour > 17) || (hour === 9 && minutes < 30) || (hour === 17 && minutes > 30)) {
            error.time = "El horario permitido para turnos es de 09:30 a 17:30.";
        }
    }

    return error;



};

export const CancelAppointment = (appointmentDateTime) => {
 
    const appointmentDate = new Date(appointmentDateTime);
    const now = new Date();
    const difference = appointmentDate.getTime() - now.getTime();
    const hoursDifference = difference / (1000 * 60 * 60);
    return hoursDifference >= 24;
}

