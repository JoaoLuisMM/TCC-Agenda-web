export class ClienteAgendamento {
  id!: number;
  nome!: string;
  email!: string;
  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.email = json.email;
    }
  }

  static toArray(jsons?: any): ClienteAgendamento[] {
    const clientes: ClienteAgendamento[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        clientes.push(new ClienteAgendamento(json));
      }
    }
    return clientes;
  }
}
