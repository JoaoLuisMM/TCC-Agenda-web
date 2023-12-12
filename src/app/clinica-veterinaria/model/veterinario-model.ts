export class Veterinario {
  id!: number;
  nome!: string;
  situacao!: string;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.situacao = json.situacao;
    }
  }

  static toArray(jsons: any[]): Veterinario[] {
    const penalidades: Veterinario[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        penalidades.push(new Veterinario(json));
      }
    }
    return penalidades;
  }
}
