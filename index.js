// 1. Importar el modulo http
import http from 'http';
import path from 'path';
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);
global["__filename"] = path.basename(new URL(import.meta.url).pathname);


// 2. Creando el servidor y su logica
// callback => Funcion
const server = http.createServer( async (req, res)=>{
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
                    type="image/x-icon" 
                    sizes="32x32" 
                    href="/favicon.ico">
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
        case '/author':
            // Peticion raiz
            // Estableciendo cabeceras
            res.setHeader('Content-Type', 'text/html');
            let url_image = 'https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=';
            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                <link 
                    rel="icon" 
                    type="image/x-icon" 
                    sizes="32x32" 
                    href="/favicon.ico">
                <title>My App</title>
                </head>
                <body style="text-align: center;">
                <h1 style="color: #333;">&#9889; Author &#9889;</h1>
                <p style="color: #34495E;">Ivan Rivalcoba Rivas - Web Developer</p>
                <div>
                    <img width="300px" src="https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=" alt="Foto Ivan Rivalcoba">
                </div>
                </body>
            </html>
            `);
            console.log(`📣 Respondiendo: 200 ${url} ${method}`);
            // Estableciendo codigo de respuesta
            res.statusCode = 200;
            // Cerrando la comunicacion
            res.end();
            break;
        case "/favicon.ico":
            // Especificar la ubicación del archivo de icono
            const faviconPath = path.join(__dirname, 'favicon.ico');
            try{
                const data = await fs.readFile(faviconPath);
                res.writeHead(200, {'Content-Type': 'image/x-icon'});
                res.end(data);
            }catch (err) {
                console.error(err);
                // Peticion raiz
                // Estableciendo cabeceras
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
                    <h1>&#128534; 500 El server esta fuera de servicio</h1>
                    <p>Lo sentimos pero hubo un error en nuestro server...</p>
                    <p> ${err.message}</p>
                </body>
                </html>
                `);
                console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
                // Estableciendo codigo de respuesta
                res.statusCode = 500;
                // Cerrando la comunicacion
                res.end();
            }
            break
        default:
            // Estableciendo ruta no encontrada
            res.setHeader('Content-Type', 'text/html');
            // Escribiendo la respuesta
            res.write(`
            <html>
                <head>
                <link 
                    rel="icon" 
                    type="image/x-icon" 
                    sizes="32x32" 
                    href="/favicon.ico">
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
