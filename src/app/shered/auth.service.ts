import { Usuario } from "./usuario.model";
import * as fb from 'firebase'

export class Auth {
    public cadastrarusuario(usuario: Usuario): Promise<any> {

        return fb.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((response: any) => {

                // Removendo atributo senha do objeto   
                delete usuario.senha;

                // Registrando informações no Banco
                fb.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((erro: Error) => console.log(erro));
    }
    public logar(email: string, senha: string) {

        fb.auth().signInWithEmailAndPassword(email, senha)
            .then((response: any) => {
                console.log(response);
            })
            .catch((erro: Error) => console.log(erro));

    }
}