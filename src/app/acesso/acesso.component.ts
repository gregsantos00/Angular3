import { Component, OnInit, trigger, state, animate, style, transition, keyframes } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner',[
        state('criado', style({opacity: 1})),
        transition('void => criado', [
          style({opacity: 0, transform: 'translate(-50px, 0)'}),
          animate('500ms 0s ease-in-out')
        ])
      
      ]),
      trigger('animacao-login',[
        state('criado', style({opacity: 1})),
        state('falha', style({opacity: 1})),
        state('falha1', style({opacity: 1})),
        transition('void => criado', [
          style({opacity: 0, transform: 'translate(50px, 0)'}),
          animate('500ms 0s ease-in-out')
        ]),
        transition('criado => falha', [
          style({opacity: 1}),
          animate('1s 0s ease-in-out', keyframes([
            style({ offset: 0.25, opacity: 1, transform: 'translateY(-10px)'}),
            style({ offset: 0.50, opacity: 1, transform: 'translateY(10px)'}),
            style({ offset: 0.75, opacity: 1, transform: 'translateY(-10px)'}),
            style({ offset: 1, opacity: 1, transform: 'translateY(0px)'})
          ]))
      ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoLogin: string = 'criado'

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(painel: string): void{
    this.cadastro = painel === 'cadastro';
  }
  public confirmaLogin(logado: boolean){
    console.log(this.estadoLogin);
    if(!logado){
      this.estadoLogin = this.estadoLogin === 'falha' ? 'falha1' : 'falha';
    }
    console.log(this.estadoLogin);
  }

}
