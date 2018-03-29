import { AcessoComponent } from "./acesso/acesso.component";
import { Routes, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { Auth } from "./shered/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private auth: Auth){

    }

    public canActivate(): boolean{
        return this.auth.autenticado();
    }
}

export const ROUTERS: Routes = [
    {path: '', component: AcessoComponent},
    {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
]

