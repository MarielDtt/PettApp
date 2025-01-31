import credentialDTO from "../dto/credentialDTO";
import userDTO from "../dto/userDTO";
import {createCredentialService} from "../service/credentialsService"
import { userModel } from "../config/data-source";
import { User } from "../entities/user";
import { Credentials } from "../entities/credential";


export const getUsersService = async (): Promise <User[]> => {
    const users = await userModel.find({
        relations:{
            appointments: true,
            credential: true
        }
        
    })
    return users;
};

export const getUserbyIdService = async (id: number): Promise <User | null> => {
    const userId = await userModel.findOne({ 
        where: { id },
        relations:{
            appointments: true
        }
     });
     if(userId){return userId}
     else throw new Error('ID incorrecto') 
    
     
};

export const createUserService = async (userData: userDTO, credentialData: credentialDTO): Promise<User> => {
    const credential: Credentials = await createCredentialService(credentialData);
    
    const user = userModel.create({...userData, credential});
    await userModel.save(user);
    
    return user;
};

export const logineUserService = async () => {};