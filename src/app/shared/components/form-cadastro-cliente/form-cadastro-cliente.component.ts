import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cliente} from "../../../core/model/cliente.model";
import {ClienteService} from "../../../core/service/cliente.service";
import {ToastUtil} from "../../util/toast-util";

@Component({
  selector: 'app-form-cadastro-cliente',
  templateUrl: './form-cadastro-cliente.component.html',
  styleUrls: ['./form-cadastro-cliente.component.css']
})
export class FormCadastroClienteComponent implements OnInit {

  @Input()
  visible = false;
  @Input()
  cliente!: Cliente;
  @Output()
  closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  saveOrUpdate: EventEmitter<Cliente> = new EventEmitter<Cliente>();

  constructor(
    private clienteService: ClienteService,
    private toast: ToastUtil
  ) {
  }

  ngOnInit(): void {
  }

  get titulo(): string {
    let titulo = "Novo cliente";
    if (this.cliente.id) {
      titulo = 'Edição de cliente';
    }
    return titulo;
  }

  save(): void {
    if (this.cliente) {
      if (this.cliente.celular != null && this.cliente.celular.length == 0) {
        this.cliente.celular = null;
      }
      if (this.cliente.cep != null && this.cliente.cep.length == 0) {
        this.cliente.cep = null;
      }
      this.clienteService.save(this.cliente).subscribe({
        next: cliente => {
          this.cliente.id = cliente.id;
          this.visible = false;
          this.closeDialog.emit(true);
          this.saveOrUpdate.emit(this.cliente);
          this.toast.showSuccessMessage('Salvando cliente', 'Cliente salvo com sucesso');
        },
        error: error => this.toast.showErrorMessage(error, 'error', 'Salvando cliente')
      });
    }
  }

  hideDialog(): void {
    this.visible = false;
    this.closeDialog.emit(true);
  }
}
