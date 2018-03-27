import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCfxGItRU-2qzWnYBzPQcDl6S64_AtjZrM",
      authDomain: "app3-intragran.firebaseapp.com",
      databaseURL: "https://app3-intragran.firebaseio.com",
      projectId: "app3-intragran",
      storageBucket: "app3-intragran.appspot.com",
      messagingSenderId: "166067331066"
    };
    fb.initializeApp(config);
  }
}
