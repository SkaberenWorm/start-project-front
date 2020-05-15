
export class ArchivoModel {
  public nombre = '';
  public path = '';
  public contenido = '';


  constructor(fields?: {
    nombre?: string;
    path?: string;
    contenido?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
