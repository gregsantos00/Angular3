import { Publicacao } from "./publicacao.model";
import * as fb from 'firebase'
import { Progresso } from "./progresso.service";
import { Injectable } from "@angular/core";


@Injectable()
export class Repository {

    constructor(private prog: Progresso) {

    }

    public Publicar(pub: Publicacao): void {
        delete pub.usuario;
        fb.database().ref(`publicacoes/${btoa(pub.email)}`)
            .push(pub)
            .then((resposta: any) => {

                fb.storage().ref().child(`imagens/${resposta.key}`)
                    .put(pub.img)
                    .on(fb.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any) => {
                        this.prog.status = 'andamento'
                        this.prog.state = snapshot

                    },
                    (erro) => {

                        this.prog.status = 'erro'
                    },
                    () => {
                        this.prog.status = 'completo';

                    }
                    );
            })

    }
    public getPublicacoes(email: string): Promise<Array<Publicacao>> {


        return fb.database().ref(`usuario_detalhe/${btoa(email)}`)
            .once('value')
            .then((user: any) => {
                let result: Array<Publicacao> = new Array<Publicacao>();
                fb.database().ref(`publicacoes/${btoa(email)}`)
                    .once('value')
                    .then((response: any) => {
                        response.forEach((element: any) => {
                            fb.storage().ref().child(`imagens/${element.key}`)
                                .getDownloadURL()
                                .then((url: string) => {
                                    result.push(new Publicacao(email, element.val().titulo, url, user.val().nome_completo));
                                });
                        })
                    });
                return result
            });
    }
}