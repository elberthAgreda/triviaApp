import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _router:Router ) { }

  private username:string;
  private password:string;

  ngOnInit() {
  }


  private authentication():void{
    var tmpLogin = this.username + " " + this.password;
    console.log(tmpLogin);
    var path = './home/inicio/';
    this._router.navigate([path]);
  }

}