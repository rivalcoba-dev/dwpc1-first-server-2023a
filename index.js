// 1. Importar el modulo http
import http from 'http';
import path from 'path';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.basename(new URL(import.meta.url).pathname);


// 2. Creando el servidor y su logica
// callback => Funcion
const server = http.createServer( (req, res)=>{
    // Desestructurando de "req"
    let { url, method } = req;

    // Codigo de comportamiento
    console.log(`📢 Client-Request: ${method} ${url}`);
    
    // Enrutar las peticiones
    switch (url) {
        case '/':
            // Peticion del recurso raiz
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                <link 
                    rel="icon" 
                    type="image/png" 
                    sizes="32x32" 
                    href="https://img.icons8.com/fluency/256/domain.png">
                <title>My App</title>
                </head>
                <body> 
                <h1 style="color: #333">Hello from my server</h1>
                <p style="color: #34495E">Estas en el recurso raiz.</p>
                </body>
            </html>
            `);
            console.log(`📣 Respondiendo: 200 ${url} ${method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 200;
            // Cerrando la comunicacion
            res.end();
            break;
    
        default:
            // Estableciendo ruta no encontrada
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                <link 
                    rel="icon" 
                    type="image/png" 
                    sizes="32x32" 
                    href="https://img.icons8.com/fluency/256/domain.png">
                <title>My App</title>
                </head>
                <body> 
                <h1>&#128534; 404 Recurso no encontrado</h1>
                <p>Lo sentimos pero no tenemos lo que buscas...</p>
                </body>
            </html>
            `);
            console.log(`📣 Respondiendo: 404 ${url} ${method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 404;
            // Cerrando la comunicacion
            res.end();
            break;
    }

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
