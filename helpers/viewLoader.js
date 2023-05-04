import path from 'path'
import { promises as asyncfs, fstat } from 'fs';

export default async(viewPath) => {
  // Se obtienen los nombres de archivos 
  // dentro del directorio viewPath
  const files = await asyncfs.readdir(viewPath);
  const viewPromises = files.map(async (file)=>{
    const view = await asyncfs.readFile(path.join(viewPath, file));
    return [file, view];
  })
  // leyendo los archivos
  let views = await Promise.all(viewPromises);
  let viewsMap = Object.fromEntries(views); 
  return viewsMap;
}