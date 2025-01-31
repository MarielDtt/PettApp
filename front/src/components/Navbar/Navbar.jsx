import styles from './Navbar.module.css';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext" ;

function Navbar() {
    const { user } = useContext(UsersContext);

    const location = useLocation();
    return (
        <>
            <nav className= {styles.nav}>   
                    <div className= {styles.logo}>
                        <Logo className= {styles.img}></Logo>  
                    </div>

                    <div className= {styles.container_navbar}> 
                    {location.pathname === "/" || location.pathname === "/registro" || location.pathname === "/contacto" ? (
                        <>
                            <li className= {styles.container_items}><Link to= "/">Login</Link></li>
                            <li className= {styles.container_items}><Link to= "/registro">Registrarse</Link></li>
                            <li className= {styles.container_items}><Link to= "/#">Contacto</Link></li>
                            
                        </>
                     
                    ): ( 
                        
                        <>
                            {user.id && (
                                <>
                                    <li className={styles.container_items}><Link to="/turnos">Mis Turnos</Link></li>
                                    <li className= {styles.container_items}><Link to= "/nuevo_turno">Nuevo Turno</Link></li>
                                </>
                            )}
                            
                            <li className= {styles.container_items}><Link to= "/registro">Perfil</Link></li>
                            <li className= {styles.container_items}><Link to= "#">Contacto</Link></li>
                            <li className= {styles.container_items}><Link to= "/">Salir</Link></li>
                        </>
                    )}       
                    </div>   
                     
            </nav>
        </>    
    )
  }
  
  export default Navbar;