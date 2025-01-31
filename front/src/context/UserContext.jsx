import { createContext } from "react";
import { useState } from "react";

export const UsersContext = createContext({
    user: {}, 
    userAppointments: [],
    setUser: () => {},
    setUserAppointments: () => {}
   });


export const UsersProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [userAppointments, setUserAppointments]= useState([]);

    console.log("este es mi contexto" , userAppointments )

     const value = {
        user,
        setUser,
        userAppointments,
        setUserAppointments,
    }

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    )
}


