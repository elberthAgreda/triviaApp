import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar-pass.html',
  styleUrls: ['../login/login.component.css']
})

export class RecuperarPassComponent implements OnInit {

    cedula: string;
    username: string;
    loader: boolean;
    password: string;
    password2: string;
    showRecuperar: boolean;

    constructor( public _router: Router ) {
        this.showRecuperar = false;
    }

    ngOnInit() { }


}
