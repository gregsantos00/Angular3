import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../shered/usuario.model'
import { Auth } from '../../shered/auth.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public eventoEmiter: EventEmitter<string> = new EventEmitter<string>()

  public mensagemErro: string = ''

  public formulario: FormGroup = new FormGroup({
    'nome_completo': new FormControl(null, [Validators.required]),
    'nome_usuario': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: Auth) { }

  ngOnInit() {
  }

  public exibirLogin(): void {
    this.eventoEmiter.emit('Login');

  }
  public cadastrar(): void {

    let user = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );
    console.log(user);

    this.authService.cadastrarusuario(user)
      .then((erro: string) => {
        this.eventoEmiter.emit('Login')
      })
      .catch((erro: string) => {
        this.mensagemErro = erro
      });


  }
}
