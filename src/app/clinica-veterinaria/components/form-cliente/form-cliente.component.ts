import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClienteVeterinaria} from "../../model/cliente-veterinaria-model";
import {Especie} from "../../model/especie-model";
import {ClienteService} from "../../service/cliente.service";
import {EspecieClienteService} from "../../service/especie-cliente.service";
import {ToastUtil} from "../../../shared/util/toast-util";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  @Input()
  visible: boolean = false;
  @Input()
  cliente!: ClienteVeterinaria;
  especies: Especie[] = [];
  sexo = [{value: null, label: 'Escolha o sexo'}, {value: 'MASCULINO', label: 'Masculino'}, {value: 'FEMININO', label: 'Feminino'}];
  @Output()
  closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  saveOrUpdate: EventEmitter<ClienteVeterinaria> = new EventEmitter<ClienteVeterinaria>();

  constructor(
    private clienteService: ClienteService,
    private especieClienteService: EspecieClienteService,
    private toast: ToastUtil
  ) {}

  ngOnInit(): void {
    this.findEspecies();
  }

  get titulo(): string {
    if (!this.cliente?.id) {
      return 'Novo cliente';
    }
    return 'Edição de cliente';
  }

  findEspecies(): void {
    this.especieClienteService.findAll().subscribe({
      next: especies => {
        this.especies = Especie.toArray(especies);
      },
      error: error => this.toast.showErrorMessage(error, 'error', 'Pesquisando espécies')
    });
  }

  save(): void {
    if (this.cliente) {
      if (this.cliente.celular != null && this.cliente.celular.length == 0) {
        this.cliente.celular = null;
      }
      if (this.cliente.cpf != null && this.cliente.cpf.length == 0) {
        this.toast.showMessage('error', 'CPF', 'O CPF do tutor é obrigatório');
        return;
      }
      this.clienteService.save(this.cliente).subscribe({
        next: cliente => {
          if (!this.cliente.id) {
            this.cliente.id = cliente.id;
          }
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
