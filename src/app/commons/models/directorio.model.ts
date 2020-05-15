
export class DirectorioModel {
  public nombre = '';
  public path = '';
  public desplegado = false;
  public directorios: Array<DirectorioModel> = [];
  public esFile: boolean;


  constructor(fields?: {
    nombre?: string;
    path?: string;
    desplegado?: string;
    directorios?: Array<DirectorioModel>;
    esFile?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
