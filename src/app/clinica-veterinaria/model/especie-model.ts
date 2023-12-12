export class Especie {
  id!: number;
  descricao!: string;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.descricao = json.descricao;
    }
  }

  static toArray(jsons: any[]): Especie[] {
    const especies: Especie[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        especies.push(new Especie(json));
      }
    }
    return especies;
  }
}
