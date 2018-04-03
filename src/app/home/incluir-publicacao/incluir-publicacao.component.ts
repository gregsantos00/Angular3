import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Repository } from '../../shered/repository.service';
import { Publicacao } from '../../shered/publicacao.model';
import * as fb from 'firebase'
import { Progresso } from '../../shered/progresso.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string = ''
  public img: any
  public porcentagemUpdload: number = 0

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    public db: Repository,
    public prog: Progresso
  ) { }

  ngOnInit() {
    fb.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })

  }

  public Publicar(): void {
    console.log('Formulario', this.formulario.value);
    this.db.Publicar(new Publicacao(
      this.email,
      this.formulario.value.titulo,
      this.img,
      ''
    ));

    let continua = new Subject();
    continua.next(true)
    Observable.interval(1000)
      .takeUntil(continua)
      .subscribe(() => {
        this.porcentagemUpdload = Math.round((this.prog.state.bytesTransferred / this.prog.state.totalBytes) * 100)
        if (this.prog.status !== 'andamento') {
          continua.next(false);
        }
      }
      )


  }
  public UploadImagem(event: any): void {

    if ((<HTMLInputElement>event.target).files.length > 0) {
      this.img = (<HTMLInputElement>event.target).files[0];
    }
  }

}
