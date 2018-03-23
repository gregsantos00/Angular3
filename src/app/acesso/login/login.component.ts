import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public eventEmitter: EventEmitter<string> = new EventEmitter()
  @Output() public eventEmitterLogin: EventEmitter<boolean> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  })
  public userIvalido: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(): void {
    this.eventEmitter.emit('cadastro');
  }

  public confirmarLogin(): void {
    if(this.formulario.valid &&
      (this.formulario.value.email !== 'greg@greg.com'|| this.formulario.value.senha !== 'senha')
    ){
      this.eventEmitterLogin.emit(false);
      this.userIvalido = true;
    }else{
      this.eventEmitterLogin.emit(true);
      this.userIvalido = false;
    }

  }

}
