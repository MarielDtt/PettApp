import { useState } from "react";
import axios from "axios";
import styles from "./NuevoTurno.module.css"
import { validateAppointments } from "../../helpers/validateAppointments";
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const NuevoTurno = () => {

    const { setUserAppointments, user } = useContext(UsersContext);

    const navigate = useNavigate();
    const [input , setInput] = useState({
        date: '',
        time: ''
    })

    const [errors, setErrors] = useState({});
    const [loginStatus, setLoginStatus] = useState("");
    const [touchInput, setTouchInput] = useState({})


    const handlerInputChange = (event) => {
        const {name, value} = event.target;
        
        setInput({
            ...input,
            [name]: value || ""
        })    
        
        if (touchInput[name]) {
            setErrors(validateAppointments(input));
        }
        
    };
    const handlerNewAppointment = (event) => {
        event.preventDefault()
        
        const newAppointmentErrors = validateAppointments (input);
        setErrors(newAppointmentErrors);
    if (!user.id) {
        navigate('/');
        return;
    } else if (Object.keys(newAppointmentErrors).length === 0){  
        
    const newAppointment = () => {
     
            axios.post("http://localhost:3000/appointments/schedule" ,{
                date: input.date,
                time: input.time,
                userid: user.id
            } ).then((res) => {
                console.log("que tiene user", user.id)
                console.log("que tiene res" , res)
                setUserAppointments(res.data.userAppointments)
                setLoginStatus("¡Turno Tomado con Exito! Aguarde y será redirigido");
                
                setTimeout(() => {
                    navigate("/turnos")
                    
                }, 2000);
            })     
            .catch((error) =>{ 
              
                if(error.status >= 500) setLoginStatus("Ocurrió un error interno. Intenta nuevamente."); 
          
                setTimeout(() => {
                    setLoginStatus(""); 
                }, 3000);
                
               });
            }
            newAppointment()
        
    
        }  else {
            setLoginStatus("Por favor, completa todos los campos.")

            setTimeout(() => {
                setLoginStatus(""); 
            }, 3000);
        }        
    }   
    const handlerBlur = (event) => {
        const { name } = event.target

        setTouchInput({
            ...touchInput,
            [name]: true
        })

        setErrors(validateAppointments(input));
    }

    return (
        <>    

        <div className={styles.containerFull}>
        
            <div className={styles.containerHalfLeft}>

                <div className={styles.title}>
                    <h3>Solicitar Nuevo Turno</h3>
                </div>
            
                <div className={styles.form}>
                <form onSubmit={handlerNewAppointment}> 
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Seleccione Fecha
                            <div className={styles.inputContainerError}>
                                <input
                                    type= 'date'
                                    value={input.date}
                                    name= 'date'
                                    onChange={handlerInputChange}  
                                    className={styles.input}
                                    onBlur={handlerBlur}
                                /> 
                                {touchInput.date && errors.date && <p className={styles.error}>{errors.date}</p>}
        
                            </div>                          
                            </label> 
                        </div>
                    
                        <div className={styles.inputContainer}>
                            <label className={styles.label}> Hora
                                <div className={styles.inputContainerError}>
                                    <input
                                        type='time'
                                        value={input.time}
                                        name= 'time'
                                        onChange={handlerInputChange}
                                        className={styles.input}
                                        onBlur={handlerBlur}
                                    />
                                    {touchInput.time && errors.time && <p className={styles.error}>{errors.time}</p>}
        
                                </div>         
                            </label> 
                        </div>
                    
                        {loginStatus && (<p className= {loginStatus === "¡Turno Tomado con Exito! Aguarde y será redirigido"
                            ? styles.loginStatusSuccess
                            : styles.loginStatusError}>
                            {loginStatus}    
                            </p>
                        )}
                        
                        <div>
                            <button type="submit" className={styles.button}>NUEVO TURNO</button>
                        </div>
                    </form> 
                </div>     
            
            </div>

            <div className={styles.lineaVertical}> </div>

            <div className={styles.containerHalfRight}>
                <div className={styles.title2}>
                    <h3>ATENCION</h3>
                    <p className={styles.p3}>Tener en Cuenta</p>
                </div>

                <div className={styles.lineaHorizontal}></div>

        
                    <ul className={styles.p}>
                        <li className={styles.li}>No podras solicitar un turno para el dia en Curso</li>
                        <li className={styles.li}>Las cancelaciones solo se efecturan con 24hs de Antelacion</li>
                    </ul>

                <div className={styles.lineaHorizontal}></div>

                <div className={styles.p}>
                    <p>Nuestro Horario de Atencion es de</p>
                    <p>Lunes a Viernes</p>
                    <p>09:00 hs A 18:00 hs</p>
                    <p className={styles.p3}>No podras solicitar turno por fuera del horario del establecimiento</p>
                </div>
            </div>
           

        </div> 
            
        
        </>    
    )   
}   
export default NuevoTurno;
