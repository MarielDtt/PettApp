import { AppDataSource, appointmentModel, credentialModel, userModel } from "../config/data-source";
import { PreloadUsers } from "./usersData";
import { PreloadAppointments } from "./appointmentsData";
import { PreloadCredentials } from "./credentialsData";
import { User } from "../entities/user";




export const preloadDataUsers = async () => {
   await AppDataSource.manager.transaction(async(transactionalEntityManager) => {
        const users = await userModel.find()

        if(users.length) return console.log("Users are already in the Database, Data Preload not Loaded") 

        for await (const user of PreloadUsers) {
            const newuser = userModel.create(user);

            await transactionalEntityManager.save(newuser)
        }    
        
        console.log("Successful User Preload");
   })
}    
  export const preloadDataAppointments = async () => {
    const appointments = await appointmentModel.find()

    if(appointments.length) return console.log("Appointments are already in the Database, Data Preload not Loaded") 
    
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    const promise= PreloadAppointments.map(async(appointment) =>{
        const newAppointment = appointmentModel.create(appointment);
        
        await queryRunner.manager.save(newAppointment)
        const userbyid = await userModel.findOneBy({id: appointment.userId});
   
        if(userbyid){
            newAppointment.user = userbyid;
         
        } else throw Error("Usuario Inexistente")
          await queryRunner.manager.save(newAppointment)
    })
    try {
        await queryRunner.startTransaction();
        await Promise.all(promise);
    
        console.log("Successful Appointment Preload");
    
        await queryRunner.commitTransaction();
    } catch (error) {
        console.log("Error when trying to create appointment");
        await queryRunner.rollbackTransaction();
    }finally{
        console.log("Preload to finished");
        await queryRunner.release();
    }


      
    /*await AppDataSource.manager.transaction(async(transactionalEntityManager) => {
        const appointments = await appointmentModel.find()

        if(appointments.length) return console.log("Appointments are already in the Database, Data Preload not Loaded") 

        for await (const appointment of PreloadAppointments) {
            const newappointment = appointmentModel.create(appointment);
            await transactionalEntityManager.save(newappointment);
            
            const userbyid = await userModel.findOneBy({id: appointment.userId});
            if(userbyid){
                newappointment.user = userbyid;
                transactionalEntityManager.save(newappointment)
            }
        }
        console.log("Successful Appointment Preload");
    })*/
  }      

  export const preloadDataCredentials = async () => {
    await AppDataSource.manager.transaction(async(transactionalEntityManager) => {
        const credentials = await credentialModel.find()

        if(credentials.length) return console.log("Credentials are already in the Database, Data Preload not Loaded")

        for await (const credential of PreloadCredentials) {
            const newcredential = credentialModel.create(credential);
            const userbyid = await userModel.findOneBy({id: credential.userId});
            if(userbyid){
                newcredential.user = userbyid;
               
            }
            await transactionalEntityManager.save(newcredential);
            
        }    
        console.log("Successful Credential Preload");
    })
  }
        /*const user1 = userModel.create(userPD1);
        const user2 = userModel.create(userPD2);
        const user3 = userModel.create(userPD3);
        const user4 = userModel.create(userPD4);
        const user5 = userModel.create(userPD5);
        const user6 = userModel.create(userPD6);
    
        await transactionalEntityManager.save(user1);
        await transactionalEntityManager.save(user2);
        await transactionalEntityManager.save(user3);
        await transactionalEntityManager.save(user4);
        await transactionalEntityManager.save(user5);
        await transactionalEntityManager.save(user6);*/
    
   


