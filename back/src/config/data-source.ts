import { DataSource } from "typeorm"
import { User } from "../entities/user"
import { Appointments } from "../entities/appointment"
import { Credentials } from "../entities/credential";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from "./envs";
import { preloadDataAppointments, preloadDataCredentials, preloadDataUsers, } from "../helpers/preloadData";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User , Appointments , Credentials ],
    subscribers: [],
    migrations: [],
})


export const connectDatabase = async () => {
    try {
       await AppDataSource.initialize()
       console.log("Connected to the Database Successfully")
       //await preloadDataUsers()
       //await preloadDataCredentials()
       //await preloadDataAppointments()
    } catch (error) {
        console.log(error)
    }
}  
export const userModel = AppDataSource.getRepository(User);
export const credentialModel = AppDataSource.getRepository(Credentials);
export const appointmentModel = AppDataSource.getRepository(Appointments);



