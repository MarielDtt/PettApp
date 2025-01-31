import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css"
import { validateLogin } from "../../helpers/validateLogin ";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const Login = () => {

    const { setUser } = useContext(UsersContext);

    const navigate = useNavigate();
    const [loginData , setLoginData] = useState({
        username: '',
        password: ''
    })

    const [errors, setErrors] = useState({});
    const [loginStatus, setLoginStatus] = useState("");
    const [touchInput, setTouchInput] = useState({})


    const handlerInputChange = (event) => {
        const {name, value} = event.target;
        
        setLoginData({
            ...loginData,
            [name]: value || ""
        })    
        
        if (touchInput[name]) {
            setErrors(validateLogin(loginData));
        }
        
    };
    const handlerOnLogin = (event) => {
        event.preventDefault()
        
        const loginErrors = validateLogin (loginData);
        setErrors(loginErrors);
    
    if (Object.keys(loginErrors).length === 0){  
    const login = () => {
            axios.post("http://localhost:3000/users/login" , loginData).then((res) => {
                setUser(res.data.user)
                setLoginStatus("¡Ingreso exitoso! Aguarde y será redirigido");
                
                setTimeout(() => {
                    navigate("/turnos")
                    
                }, 2000);
            })     
            .catch((error) =>{ 
              
                if(error.status >= 500) setLoginStatus("Ocurrió un error interno. Intenta nuevamente."); 
                setLoginStatus("Usuario o Contraseña Incorrectos")

                setTimeout(() => {
                    setLoginStatus(""); 
                }, 3000);
                
               });
            }
        login()
        
    
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

        setErrors(validateLogin(loginData));
    }

    return (
        <>    

        <div className={styles.containerFull}>
        
            <div className={styles.containerHalfLeft}>

                <div className={styles.title}>
                    <h3>Iniciá sesión para continuar</h3>
                </div>
            
                <div className={styles.form}>
                <form onSubmit={handlerOnLogin}> 
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Ingrese Usuario 
                            <div className={styles.inputContainerError}>
                                <input
                                    type= 'text'
                                    value={loginData.username}
                                    name= 'username'
                                    onChange={handlerInputChange}  
                                    className={styles.input}
                                    onBlur={handlerBlur}
                                /> 
                                {touchInput.username && errors.username && <p className={styles.error}>{errors.username}</p>}
        
                            </div>                          
                            </label> 
                        </div>
                    
                        <div className={styles.inputContainer}>
                            <label className={styles.label}> Ingresa Contraseña
                                <div className={styles.inputContainerError}>
                                    <input
                                        type='password'
                                        value={loginData.password}
                                        name= 'password'
                                        onChange={handlerInputChange}
                                        className={styles.input}
                                        onBlur={handlerBlur}
                                    />
                                    {touchInput.password && errors.password && <p className={styles.error}>{errors.password}</p>}
        
                                </div>         
                            </label> 
                        </div>
                    
                        {loginStatus && (<p className={loginStatus === "¡Ingreso exitoso! Aguarde y será redirigido"
                            ? styles.loginStatusSuccess
                            : styles.loginStatusError
                         }>
                            {loginStatus}
                            </p>
                        )}
                        <div>
                            <button type="submit" className={styles.button}>INGRESAR</button>
                        </div>
                    </form> 
                </div>     
            
            </div>

            <div className={styles.lineaVertical}> </div>

            <div className={styles.containerHalfRight}>
                <div className={styles.title2}>
                    <h3>Bienvenido</h3>
                </div>

                <div className={styles.lineaHorizontal}></div>

                <div className={styles.p}>
                    <p>¿Todavia no tenes cuenta?</p>
                    
                    <p className={styles.p2}>Registrate <Link to="/registro">Aca</Link></p>
                </div>

                <div className={styles.lineaHorizontal}></div>

                <div className={styles.p}>
                    <p>¿Olvidates tu contraseña?</p>
                </div>
            </div>
           

        </div> 
            
        
        </>    
    )   
}   
export default Login;
