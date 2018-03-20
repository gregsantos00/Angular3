import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

@Output()  public eventEmitter: EventEmitter<string> = new EventEmitter()
  
  constructor() { }

  ngOnInit() {
  }

  public exibirPainel() : void {
    this.eventEmitter.emit('cadastro');
  }

}
