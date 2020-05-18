
export class ArchivoModel {
  public nombre = '';
  public path = '';
  public contenido = '';
  public esPreview = true;


  constructor(fields?: {
    nombre?: string;
    path?: string;
    contenido?: string;
    esPreview?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
