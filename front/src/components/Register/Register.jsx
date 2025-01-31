import styles from './Register.module.css';
import { useState } from 'react';
import axios from 'axios';
import { validateRegister } from '../../helpers/validateregister';
import { useNavigate } from 'react-router-dom';

/*
Implementar en el componente Register un formulario controlado que se encargará del registro de usuario. 

Controlar el formulario de manera tal que se pueda validar que todos los datos necesarios para el registro están completos, al mismo tiempo que los datos de los inputs son reflejados en el estado local correspondiente y viceversa.

Una vez completos y validados los datos, se debe poder presionar un botón que dispare un evento, el cual ejecutará una función que se encargue de realizar la petición de tipo POST correspondiente al servidor para el registro del usuario enviando como body el estado que se confeccionó a través del formulario. 

En caso de que el registro sea exitoso, informar al usuario. Del mismo modo, informar al usuario si ha ocurrido un error.*/
const Register = () => {
           
    const navigate = useNavigate();
    const [input, setInput] = useState({ /*maneja los datos del formulario, almacena los valores de los input*/
        name: "",
        birthdate: "",
        nDni: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmpassword: ""
    })   

    const [errors, setErrors] = useState({}); /*almacena mensajes de error para la validacion de los campos*/
    const [registerStatus, setRegisterStatus] = useState(""); /*maneja el estado de registro, indicando un mensaje para el exito o no*/
    const [touchInput, setTouchInput] = useState({}) /*verificamos si el usuario ingreso al input para luego arrojar el error*/

    const handlerInputChange = (event) => {
        const {name, value} = event.target;

        setInput({
            ...input,
            [name]: value

        })

        setErrors(validateRegister(input));
    };

    const handlerOnRegister = (event) => {
        event.preventDefault()
        
        const registerErrors = validateRegister(input);
        setErrors(registerErrors);
        
        if (Object.keys(registerErrors).length === 0) { /*tranformo el objeto error en un array para utilizar metodo length, si el array es igual en cero no contendra errores y se procedera a la carga de datos en la base*/
                      
            const register = () => {
                axios.post("http://localhost:3000/users/register" , input).then(() => {(input)
                setRegisterStatus("¡Registro exitoso! Aguarde y sera redirigido")

                setTimeout(() => {
                    setRegisterStatus("")
                    navigate("/");
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                setRegisterStatus("Ocurrió un error interno. Intenta nuevamente.");
            });
        };

            register();
                } else {
                setRegisterStatus("Por favor, corrige los errores antes de registrarte.");
                
                setTimeout(() => {
                    setRegisterStatus(""); 
                }, 5000);
            }
        };

        const handlerBlur = (event) => {
            const { name } = event.target

            setTouchInput({
                ...touchInput,
                [name]: true
            })

            setErrors(validateRegister(input));
        }

    return(
        <form className= {styles.container} onSubmit={handlerOnRegister}> 
          <h1 className= {styles.h1}>Te Invitamos a Registrarte</h1>
           <div className={styles.containerInput}>
                <label>Nombre 
                    <div>
                        <input
                        type= 'text'
                        value={input.name}
                        name= 'name'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.name && errors.name && <p className={styles.error}>{errors.name}</p>}
                    </div>    
                </label>    
        
                <label> Fecha de Nacimiento
                    <div>
                        <input
                        type='date'
                        value={input.birthdate}
                        name= 'birthdate'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.birthdate && errors.birthdate && <p className={styles.error}>{errors.birthdate}</p>}
                    </div>    
                </label>               
            </div> 

            <div className={styles.containerInputOnly}>
                <label> Dni
                    <div>
                        <input
                        type='number'
                        value={input.nDni}
                        name= 'nDni'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.nDni && errors.nDni && <p className={styles.error}>{errors.nDni}</p>}
                    </div>    
                </label>    
            </div>

            <div className={styles.containerInput}>
                <label>Email
                    <div>
                        <input
                        type='email'
                        value={input.email}
                        name= 'email'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.email && errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>    
                </label>    
            
                <label>Telefono
                    <div>
                        <input
                        type='number'
                        value={input.phone}
                        name= 'phone'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.phone && errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>    
                </label>    
            </div>

            <div className={styles.containerInputOnly}>
                <label> Usuario
                    <div>
                        <input
                        type='text'
                        value={input.username}
                        name='username'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.username && errors.username && <p className={styles.error}>{errors.username}</p>}
                    </div>    
                </label>    
            </div>

            <div className={styles.containerInput}>
                <label> Contraseña
                    <div>
                        <input
                        type='password'
                        value={input.password}
                        name='password'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.password && errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>    
                </label>

                <label> Repetir Contraseña
                    <div>
                        <input
                        type='password'
                        value={input.confirmpassword}
                        name= 'confirmpassword'
                        onChange={handlerInputChange}
                        onBlur={handlerBlur}
                        className={styles.input}
                        />
                        {touchInput.confirmpassword && errors.confirmpassword && <p className={styles.error}>{errors.confirmpassword}</p>}
                    </div>    
                </label>
            </div>
           
            {registerStatus && (
                <div className={registerStatus === "¡Registro exitoso! Aguarde y sera redirigido" 
                ? styles.registerStatusSuccess 
                : styles.registerStatusError}>
                {registerStatus}
                </div>
            )}
             
              
            
        <button type= 'submit' className={styles.button}>Registrarse</button>

     </form>
   )

}

export default Register;