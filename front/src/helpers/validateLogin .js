export const validateLogin  = (input) => {
    const error= {};


    if(!input.username) {
        error.username = "Campo Requerido"
    }

    if(!input.password) {
        error.password = "Campo Requerido"
    }

    return error;
}