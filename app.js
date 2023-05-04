import path from "path";
import { promises as fs } from 'fs';

// Funciones Auxiliares
function error500(req, res){
  
}

export default async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
  switch (url) {
    case '/':
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      const indexPath = path.join(__dirname, 'views', 'index.html');
      const indexView = await fs.readFile(indexPath);;
      res.write(indexView);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
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
      const authorPath = path.join(__dirname, 'views', 'author.html');
      const authorView = await fs.readFile(authorPath);;
      res.write(authorView);
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end();
      break;
    case "/favicon.ico":
      // Especificar la ubicación del archivo de icono
      const faviconPath = path.join(__dirname, 'favicon.ico');
      try {
        const data = await fs.readFile(faviconPath);
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end(data);
      } catch (err) {
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        const page500Path = path.join(__dirname, 'views', '500.html');
        const page500View = await fs.readFile(page500Path);
        // Escribiendo la respuesta
        res.write(page500View);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        console.log(`📣 Error: 500 ${err.message}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break;
    case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Se crea una variable para almacenar los
		    // Datos entrantes del cliente
        let body = "";
        // Se registra un manejador de eventos
        // Para la recepción de datos
        req.on("data", (data => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        }));
        // Se registra una manejador de eventos
		    // para el termino de recepción de datos
        req.on("end", async () => {
          // Procesa el formulario
          // Mediante URLSearchParams se extraen
			    // los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos
			    // en la variable params
          const parsedParams = Object.fromEntries(params);
          // Almacenaremos en un archivo el mensaje
          await fs.writeFile('message.txt', parsedParams.message);
          console.log("📣 Archivo message.txt grabado");
        })
        // En lugar de regrear una pagina HTML
        // Realizaremos un redireccionamiento
        res.statusCode = 302;
        // Esto establece un redireccionamiento
        res.setHeader('Location', '/');
        // Se finaliza la conexion
        return res.end();
      } else {
        res.statusCode = 404;
        const page404Path = path.join(__dirname, 'views', '404.html');
        const page404View = await fs.readFile(page404Path);
        res.write(page404View)
        res.end();
      }
      break;
      // Continua con el defautl
    default:
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      const page404Path = path.join(__dirname, 'views', '404.html');
      const page404View = await fs.readFile(page404Path);
      // Escribiendo la respuesta
      res.write(page404View);
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
      // Cerrando la comunicacion
      res.end();
      break;
  }
};
