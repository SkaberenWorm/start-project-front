
export class OptionModel {
  public useCommonsUftDependency = true;
  public isMasculineEntity = true;

  constructor(fields?: {
    useCommonsUftDependency?: boolean;
    isMasculineEntity?: boolean;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
