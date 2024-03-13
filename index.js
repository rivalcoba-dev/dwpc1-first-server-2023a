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
                <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                <title>My App</title>
                <style>
                    body {
                    background-color: #ECF0F1;
                    font-family: Arial, sans-serif;
                    }
                    h1, h2 {
                    color: #3498DB;
                    text-align: center;
                    margin-top: 50px;
                    }
                    form {
                    margin-top: 30px;
                    text-align: center;
                    }
                    input[type="text"] {
                    width: 300px;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 0px 0px 5px #3498DB;
                    outline: none;
                    }
                    button[type="submit"] {
                    background-color: #3498DB;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    cursor: pointer;
                    box-shadow: 0px 0px 5px #3498DB;
                    outline: none;
                    }
                    button[type="submit"]:hover {
                    background-color: #2980B9;
                    }
                </style>
                </head>
                <body> 
                <h1>Hello from my server</h1>
                <h2>Ingresa un mensaje</h2>
                <div>
                    <form action="/message" method="POST">
                        <input type="text" name="message">
                        <button type="submit">Send</button>
                    </form>
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
        case "/message":
            // Verifico si el metodo de petición es un POST
            if(method === "POST"){
                // Variable para datos entrantes
                let body = "";

                // 1. Registra eventos de datos entrantes
                req.on("data",(data)=>{
                    // Concatenando datos de entrada
                    body += data;
                    // Estableciendo limite de datos entrantes
                    if(body.length > 1e6) return req.socket.destroy();
                });

                // 2. Registra termino de la recepcion de datos
                req.on("end",()=>{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    // Mediante URLSearchParams se extraen
			        // los campos del formulario
                    const params = new URLSearchParams(body);
                    // Se construye un objeto a partir de los datos
			        // en la variable params
                    const parsedParams = Object.fromEntries(params);
                    res.write(`
                    <html>
                        <head>
                        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico">
                        <title>My App</title>
                        <style>
                            body {
                            background-color: #f9f9f9;
                            font-family: Arial, sans-serif;
                            }
                            h1 {
                            color: #e74c3c;
                            font-size: 48px;
                            margin-top: 50px;
                            text-align: center;
                            }
                            p {
                            font-size: 24px;
                            color: #7f8c8d;
                            text-align: center;
                            margin-top: 20px;
                            }
                            .error-message {
                            font-size: 18px;
                            color: #95a5a6;
                            text-align: center;
                            margin-top: 20px;
                            }
                        </style>
                        </head>
                        <body> 
                        <h1 style="color: #333">SERVER MESSAGE RECIEVED &#128172</h1>
                        <p>${parsedParams.message}</p>
                        </body>
                    </html>
                    `);
                    return res.end();
                });
            }else{
                res.statusCode = 404;
                res.write("404: Endpoint no encontrado")
                res.end();
            }
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
} );

// 3. Poner a trabajar el servidor
server.listen(3000,"0.0.0.0", (err)=>{
    // Verificando que no haya error
    if(err) console.log("❌ Error al iniciar el server");
    // Si no hay error
    console.log("🥳 Servidor escuchando en http://localhost:3000");
});
