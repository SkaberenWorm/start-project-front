import { AtributoModel } from "./atributo.model";

export class BaseArchivoModel {

  public nombreClase = '';

  public pathArchivo = '';
  public packageArchivo = '';

  public pathDirectorioBase = '';
  public packageBase = '';

  public contenido = '';
  public atributos: Array<AtributoModel> = [];

  constructor(fields?: {
    nombreClase?: string;
    pathArchivo?: string;
    packageArchivo?: string;
    pathDirectorioBase?: string;
    packageBase?: string;
    contenido?: string;
    atributos?: Array<AtributoModel>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
