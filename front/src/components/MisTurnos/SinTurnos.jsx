import styles from "./MisTurnos.module.css"
import { useContext } from "react"
import { UsersContext  } from "../../context/UserContext"
import { Link } from "react-router-dom"
const SinTurnos = () => {

    const { user } = useContext(UsersContext)


    return (
        <div className={styles.containerFull}>
            <div>
                <h2 className= {styles.titulo}>Bienvenido {user.name}</h2>  
            </div>
            <div>
                <h2 className= {styles.h1}>Actualmente no tiene Turnos</h2>
            </div>
            <div>
                <p className={styles.p2}>Ingrese <Link to="/nuevo_turno">Aca</Link> para tomar un Turno</p>
            </div>
        </div>
    )
}

export default SinTurnos