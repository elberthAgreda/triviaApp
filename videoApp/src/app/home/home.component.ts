import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'trivia-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  constructor( public _router:Router ){}

  ngOnInit() {}

  navegar( ruta: string ){
    this._router.navigate([ruta]);
  }

}