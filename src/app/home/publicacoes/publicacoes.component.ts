import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase'
import { Repository } from '../../shered/repository.service';
import { Publicacao } from '../../shered/publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public lista: Publicacao[] = new Array<Publicacao>()
  constructor(private repo: Repository) { }

  ngOnInit() {
    fb.auth().onAuthStateChanged((user: any) => {

      this.repo.getPublicacoes(user.email)
        .then((result: Publicacao[]) => {
          this.lista = result;
        });
    })
  }

}
