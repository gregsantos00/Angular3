import { Usuario } from "./usuario.model";
import * as fb from 'firebase'
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Auth {

    public id_token: string = ''

    constructor(private router: Router) { }

    public cadastrarusuario(usuario: Usuario): Promise<string> {

        return fb.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((response: any) => {

                // Removendo atributo senha do objeto   
                delete usuario.senha;

                // Registrando informações no Banco
                fb.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
                return '';
            })
            //.catch((erro: Error) => { return erro.message });
    }
    public logar(email: string, senha: string): Promise<string> {

        return fb.auth().signInWithEmailAndPassword(email, senha)
            .then((response: any) => {
                fb.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.id_token = token
                        localStorage.setItem('idToken', this.id_token)
                        this.router.navigate(['/home'])

                    })
                return ''
            })
            .catch((erro: Error) => { return erro.message });

    }
    public autenticado(): boolean {

        if (this.id_token === '' && localStorage.getItem('idToken') !== null) {
            this.id_token = localStorage.getItem('idToken');
        }
        if (this.id_token === '') {
            this.router.navigate(['/']);
        }
        return this.id_token !== '';
    }
    public logout(): void {
        fb.auth().signOut()
            .then(() => {
                this.id_token = '';
                localStorage.removeItem('idToken');
                this.router.navigate(['/'])
            });
    }
}