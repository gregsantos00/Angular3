import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

import {Imagem} from './imagem.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [state('escondido', style(
      { opacity: 0 }
    )),
    state('visivel', style(
      { opacity: 1 }
    )),
    transition('escondido <=> visivel', animate('2s ease-in'))
    
    ]
    )
  ]
})
export class BannerComponent implements OnInit {

  public estado : string = 'escondido';
  private index: number = 0;

  public imagens: Imagem[] = [
    new Imagem('visivel', '/assets/banner-acesso/img_1.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_2.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_3.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_4.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_5.png')
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(()=> this.rotacao(),3000);
  }

  private rotacao(): void{
    
    this.imagens[this.index].estado= 'escondido';

    this.index = (this.imagens.length - 1) === this.index ? 0 : this.index + 1;

    this.imagens[this.index].estado = 'visivel';

    setTimeout(()=> this.rotacao(),3000);

  }
}
