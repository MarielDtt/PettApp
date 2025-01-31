import { Request , Response } from "express";
import { Iappointment } from "../interfaces/Iappointment";
import { createAppointmentService, getAppointmentbyIdService, getAppointmentsService, cancelAppointmentService } from "../service/appointmentsService";
import { Appointments } from "../entities/appointment";
import { sendEmail } from "../service/emailService";


export const getAppointments = async (req: Request, res: Response): Promise<Response> => {
    try{
        const appointmets: Appointments[] = await getAppointmentsService();
        if(!appointmets.length) return res.status(404).json("Usuarios no Encontradas")
        return res.status(200).json(appointmets);

    }
    catch(error){
        return res.status(500).json({error})
    }
};

export const getAppointmentById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const numberChange = parseInt(id, 10);  // Convertimos a número
    
    try{
        const appointmentId = await getAppointmentbyIdService(numberChange);
        return res.status(200).json(appointmentId);
    }   
    catch(error){
        return res.status(404).json({
            error: "ID incorrecto"
        });
    } 
};

export const createAppointment = async (req: Request, res: Response) => { 
    const { date , time, userid } = req.body;
 
    if (!date || !time || !userid ) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
        
    }
    try{
        const numberChange = parseInt(userid, 10);
        console.log(numberChange)
        
        const newAppointment = await createAppointmentService({date, time, userId:userid});

        if (!newAppointment) {
            return res.status(400).json({ error: "Cita no creada correctamente" });
        }


        await sendEmail(
            newAppointment.user.email,  // Aquí debes acceder al email del usuario
            'Confirmación de turno',  // Asunto
            'Tu turno ha sido confirmado.',  // Cuerpo en texto
            '<b>Tu turno ha sido confirmado.</b>'  // Cuerpo en HTML
        );
        return res.status(201).json(newAppointment);

    }
    catch(error){
        return res.status(400).json({
            error: "Appointment no Creado"
        })
    };
};

export const cancelAppointment = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try{
        await cancelAppointmentService(Number(id))
        
        return res.status(200).json({message:"Turno Cancelado Exitosamente"})
    }
    catch(error){
        return res.status(404).json({
            error: "ID incorrecto"
        })
    };
};
