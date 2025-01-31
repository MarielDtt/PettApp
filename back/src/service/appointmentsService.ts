import { appointmentDTO } from "../dto/appointmentDTO";
import { Appointments, stateRole } from "../entities/appointment";
import { appointmentModel, userModel } from "../config/data-source";
import { error } from "console";


export const getAppointmentsService  = async (): Promise<Appointments[]> => {
    const appointment = await appointmentModel.find({
        relations: {
            user: true,
        }
    });
    return appointment;
};

export const getAppointmentbyIdService = async (id: number): Promise <Appointments | null> => {
    const appointmentId = await appointmentModel.findOne({
        where: { id }, 
        relations: { user: true,}});
    
    if(appointmentId){return appointmentId;}
    else throw error ('ID incorrecto')
 
};

export const createAppointmentService = async (appointmentData: appointmentDTO): Promise<Appointments | null> => {
    const newAppointment = appointmentModel.create(appointmentData);
    await appointmentModel.save(newAppointment);

    const user = await userModel.findOneBy({
        id: appointmentData.userId
    })

    if(user){
        newAppointment.user = user;
        appointmentModel.save(newAppointment)
    }
    else return null

    return {...newAppointment, user};
};

export const cancelAppointmentService = async (id: number): Promise<void | null> => {
    const changeStatus = await appointmentModel.findOne({where: {id}})

    if(changeStatus){
        changeStatus.status = stateRole.CANCEL ;
        await appointmentModel.save(changeStatus);
    } 
    else{
        throw new Error ("usario no encontrado")
    }
};
