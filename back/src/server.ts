import express  from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors"


const server = express() /*instancia del servidor */

server.use(express.json()) /*convertidor de json a js*/
server.use(morgan("dev"))
server.use(cors());
server.use(router);




export default server;