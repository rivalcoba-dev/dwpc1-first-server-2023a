// 1. Importar el modulo http
import { log } from 'console';
import http from 'http'

// 2. Creando el servidor y su logica
// callback => Funcion
const server = http.createServer( (req, res)=>{
    // Codigo de comportamiento
    console.log("> 📢 Se ha recibido una petición");
    // Respondiendo al cliente
    res.write("Hola desde el server...");
    // Terminando la conexion
    res.end();
} );

// 3. Poner a trabajar el servidor
server.listen(3000,"0.0.0.0", (err)=>{
    // Verificando que no haya error
    if(err) console.log("❌ Error al iniciar el server");
    // Si no hay error
    console.log("🥳 Servidor escuchando en http://localhost:3000");
});