import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { connectDatabase } from "./config/data-source"

try {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })

    connectDatabase()
} catch (error) {
    console.log(error)
}
   


