export const validateRegister = (input) => {
    const error = {};
    const nameRegex = /^[A-Za-zÑñ ]+$/;
    const birthdateRegex = /(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
    const nDniRegex = /^\d{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    const usernameRegex = /^[A-Za-z0-9]{4,16}$/;

    if(!input.name) {
        error.name = "Campo Requerido";
    } else if(!nameRegex.test(input.name)){
        error.name = "Nombre invalido, Formato Esperado: Solo Letras"
    }

    if(!input.birthdate) {
        error.birthdate = "Campo Requerido"
    } else if(!birthdateRegex.test(input.birthdate)){
        error.birthdate = "Fecha Invalida, Formato Esperado: DD/MM/YYYY"
    }
    if(!input.nDni) {
        error.nDni = "Campo Requerido"
    } else if(!nDniRegex.test(input.nDni)){
        error.nDni = "Dni Invalido, Formato Esperado: Ingresar 8 Digitos "
    }

    if(!input.email) {
        error.email = "Campo Requerido"
    } else if(!emailRegex.test(input.email)){
        error.email = "Email Invalido, Formato Esperado: xxxx@xxxx.com.ar"
    }

    if(!input.phone) {
        error.phone = "Campo Requerido"
    } else if(!phoneRegex.test(input.phone)){
        error.phone = "Telefono Invalido,Formato Esperado: Ingresar 10 digitos"
    }

    if(!input.username) {
        error.username = "Campo Requerido"
    } else if(!usernameRegex.test(input.username)){
        error.username = "Username Invalido, Formato Esperado: Solo Letras y Numeros"
    }

    if(!input.password) {
        error.password = "Campo Requerido"
    } 
    if(!input.confirmpassword) {
        error.confirmpassword = "Campo Requerido"
    } else if(input.password !== input.confirmpassword){
        error.confirmpassword= "La contraseña de verificación no coincide."
    }


    return error;
}