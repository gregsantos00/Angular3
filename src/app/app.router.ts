import { AcessoComponent } from "./acesso/acesso.component";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";


export const ROUTERS: Routes = [
    {path: '', component: AcessoComponent},
    {path: 'home', component: HomeComponent}
]