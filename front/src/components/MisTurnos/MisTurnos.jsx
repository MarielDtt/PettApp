//import appointments  from "../../helpers/myAppointments";
import { useState, useEffect, useContext } from "react";
import { UsersContext  } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Turno from "../../components/Turno/Turno";
import styles from './MisTurnos.module.css';
import axios from "axios";
import SinTurnos from "./SinTurnos";


function Misturnos() {
    const { user, userAppointments, setUserAppointments } = useContext(UsersContext);

    const navigate = useNavigate()

    // const [turnos, setTurnos] = useState([]);
    
   useEffect(() => {

        if (!user.id) {
            navigate('/');
            return;
        }

       axios.get(`http://localhost:3000/users/${user.id}`).then((res)  => {   
 
        setUserAppointments(res.data.userId.appointments)      
    })

       .catch((error) => console.log(error));
    }, [])

    return (
        <>
        {userAppointments && userAppointments.length > 0 ? (
            <> 
            <h2 className= {styles.titulo}>Bienvenido {user.name}</h2>       

            <div className={styles.container}>
                {userAppointments.map((turno) => {
                    return <Turno key={turno.id} turno={turno} />;
                })}
            </div>
            </> 
        ) : (
        
        <SinTurnos />
    )}         
        </>    
    )
}

export default Misturnos;