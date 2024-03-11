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
    // Estableciendo cabeceras
    res.setHeader('Content-Type','text/html');
    // Respondiendo al cliente
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My primer back-end</title>
        </head>
        <body>
            <h1>Mi primer back-end</h1>
        </body>
    </html>
    `);
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
