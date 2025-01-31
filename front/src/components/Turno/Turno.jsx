import styles from './Turno.module.css';
import { useContext } from 'react';
import { UsersContext } from '../../context/UserContext';
import { CancelAppointment} from '../../helpers/validateAppointments'
import axios from 'axios';

const Turno = ({turno: {id, date, time, status}}) =>  {
        const { userAppointments, setUserAppointments } = useContext(UsersContext)
        console.log("Contenido de userAppointments:", userAppointments);

 
        const formatDate = new Date(date).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const handlerButtonCancel = (event) => {
            const appointmentDateTime = `${date}T${time}:00`;

            if (CancelAppointment(appointmentDateTime)) {
                axios.put(`http://localhost:3000/appointments/cancel/${id}`).then((res)  => {   
                    const newAppointment = userAppointments.map(appointments =>{
                        if(appointments.id === id){
                            return{ ...appointments,
                                    status: "cancel"
                            }
                        }
                        return appointments;
                    })
 
                     setUserAppointments(newAppointment)
                })
                .catch(error => {
                 
                    console.error("Error al cancelar el turno:", error);
                });
            }  
            else  {
                alert("No se puede cancelar el turno con menos de 24 horas de antelación.");
            }  
        }
    {
    return (
        <div className= {styles.container}>
                
            <h4 className= {styles.texto}>Fecha: {formatDate} </h4>
            <h4 className= {styles.texto}>Hora: {time}</h4>
               
            <div className= {styles.texto }>
                <h4>Estado: {status === "cancel" ? "Cancelado" : "Activo"}</h4>
            </div>
            
            <button type='button' className={styles.button} onClick={handlerButtonCancel}>Cancela</button>
        </div>
        )
    }
}
export default Turno;