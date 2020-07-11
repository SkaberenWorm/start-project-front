import { AtributoModel } from './atributo.model';
import { OptionModel } from './option.model';

export class BaseArchivoModel {

  public nombreClase = '';
  public pathArchivo = '';
  public packageArchivo = '';
  public pathDirectorioBase = '';
  public packageBase = '';
  public contenido = '';
  public option = new OptionModel();
  public atributos: Array<AtributoModel> = [];

  constructor(fields?: {
    nombreClase?: string;
    pathArchivo?: string;
    packageArchivo?: string;
    pathDirectorioBase?: string;
    packageBase?: string;
    contenido?: string;
    option?: OptionModel;
    atributos?: Array<AtributoModel>;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
