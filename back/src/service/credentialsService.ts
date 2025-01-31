import { credentialModel } from "../config/data-source";
import credentialDto from "../dto/credentialDTO";
import { Credentials } from "../entities/credential";
import { User } from "../entities/user";

export const createCredentialService = async(credentialData:credentialDto): Promise <Credentials> =>{
    
    const newCredential = credentialModel.create(credentialData);
    await credentialModel.save(newCredential)
    return  newCredential;   
}

export const validationCredential = async(usersData: credentialDto): Promise<User | undefined> => {
    const validation = await credentialModel.findOne({ where: { username: usersData.username}, relations:{
        user: true} }) 
    
    if(validation ){
       
        if(validation.password === usersData.password){
            return validation.user;
        }
    } return undefined;    

}