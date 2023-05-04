import path from "path";
import { promises as fs } from 'fs';
import viewLoader from "./helpers/viewLoader.js";
import ViewServer from './helpers/viewsServer.js'

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const viewPath = path.join(__dirname, 'views');

// Creando un Mapa con los nombres
// de las rutas asociados a sus archivos
let views = await viewLoader(viewPath);

// Funciones Auxiliares
function error500(err, serveView, view) {
  console.log(`🔥 Respondiendo: 500`);
  console.log(`🔥 Error: 500 ${err.message}`);
  console.error(err);
  // Obteniendo la vista
  view = views['500.html'];
  // Sirviendo la vista
  serveView(view, 500);
}

export default async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;
  // Creando un servidor de imagenes
  let serveView = ViewServer(req, res);
  let view = views['index.html'];

  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);

  // Enrutando peticiones
  switch (url) {
    case '/':
      // GET "/""
      // Escribiendo la respuesta
      console.log(`📣 Respondiendo: ${req.method} ${req.url}`);
      // Sirviendo la vista por defecto
      serveView(view);
      break;
    case '/author':
      // GET /author
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
      // Obteniendo la vista
      view = views['author.html'];
      // Sirviendo la vista
      serveView(view);
      break;
    case "/favicon.ico":
      // Especificar la ubicación del archivo de icono
      const faviconPath = path.join(__dirname, 'favicon.ico');
      let data;
      try {
        data = await fs.readFile(faviconPath);
      } catch (err) {
        return error500(err, serveView, view);
      }
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(data);
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
        // Obteniendo la vista
        view = views['404.html'];
        // Sirviendo la vista
        serveView(view, 404);
      }
      break;
    // Continua con el defautl
    default:
      // Obteniendo la vista
      view = views['404.html'];
      // Sirviendo la vista
      serveView(view, 404);
      break;
  }
};
