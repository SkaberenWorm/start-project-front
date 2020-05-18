
export class AtributoModel {
  public tipo = '';
  public variable = '';
  public primaryKey = false;


  constructor(fields?: {
    tipo?: string;
    variable?: string;
    primaryKey?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
