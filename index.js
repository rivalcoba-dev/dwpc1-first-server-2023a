// 1. Importar el modulo http
import http from 'http';
import path from 'path';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.basename(new URL(import.meta.url).pathname);


// 2. Creando el servidor y su logica
// callback => Funcion
const server = http.createServer( (req, res)=>{
    // Codigo de comportamiento
    console.log("> 📢 Se ha recibido una petición");
    console.log(`📢 Client-Request: ${req.method} ${req.url}`);
    // Respondiendo al cliente
    res.write("Hola desde el server...");
    // Terminando la conexion
    res.end();
    // Terminado el servidor
    process.exit();
} );

// 3. Poner a trabajar el servidor
server.listen(3000,"0.0.0.0", (err)=>{
    // Verificando que no haya error
    if(err) console.log("❌ Error al iniciar el server");
    // Si no hay error
    console.log("🥳 Servidor escuchando en http://localhost:3000");
});
