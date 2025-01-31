import { Request , Response } from "express";
import { getUserbyIdService, getUsersService, createUserService } from "../service/usersService";
import {validationCredential} from "../service/credentialsService";
import { User } from "../entities/user";
import credentialDTO from "../dto/credentialDTO";


export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try{
    const users: User[] = await getUsersService();  
    return res.status(200).json(users)
  }
  catch(error){
    return res.status(503).json({error: "Error Interno"})

  }
};

export const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const numberChange = parseInt(id, 10);  // Convertimos a número
    
    try{
        const userId = await getUserbyIdService(numberChange);
        return res.status(200).json({userId});
    }
    catch(error){
        return res.status(404).json({
            error: "ID incorrecto"
        });
    };  
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { name, birthdate, nDni, email, phone, username, password} = req.body;
        
    if (!name || !birthdate || !nDni || !email || !phone || !username || !password) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
        
    }
    try{
        const newUser: User = await createUserService({name, birthdate, nDni, email, phone},{username, password})
        return res.status(201).json(newUser);
    }
    catch(error){
        console.log("Error al crear el usuario:", error); 
        return res.status(400).json({
            
            error: "User no Creado"
            
        })
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    
   const {username, password}:credentialDTO = req.body;
   

    try{
        const user = await validationCredential({username, password});

        if (user){
            return res.status(200).json({login: true, user});
        }else {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }
        
    }
    
    catch(error){
        return res.status(400).json({
            error: "User o Password Incorrecto, Vuelva a Intentarlo"
        })
    }
};

