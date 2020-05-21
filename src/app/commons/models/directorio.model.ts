
export class DirectorioModel {
  public nombre = '';
  public path = '';
  public packageBase = '';
  public desplegado = false;
  public directorios: Array<DirectorioModel> = [];
  public esFile: boolean;
  public pathValid: boolean;


  constructor(fields?: {
    nombre?: string;
    path?: string;
    packageBase?: string;
    desplegado?: string;
    directorios?: Array<DirectorioModel>;
    esFile?: boolean;
    pathValid?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
