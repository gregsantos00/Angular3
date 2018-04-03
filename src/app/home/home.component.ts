import { Component, OnInit, Injectable } from '@angular/core';
import { Auth } from '../shered/auth.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  public LogOut(): void {
    this.auth.logout();
  }

}
