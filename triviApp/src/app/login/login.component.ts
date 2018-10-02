import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../shared/services/custom.service';
import { LocalService } from '../shared/services/local.service';
import { ResponseModel } from '../shared/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  user:any = [];
  stateMessage:boolean = false;
  message:string;

  constructor(  public _router:Router,
                public _customService:CustomSevice,
                public _localService:LocalService ){}

  ngOnInit() {
  }

  authentication():void{
    this.user = {"userName":this.username, "password":this.password}
    var ruta = "./home/inicio/";
    this._customService.login<ResponseModel>(this.user).subscribe(
      response => {
        console.log(response);
        this._localService.setResponseModel(response);
        this._localService.setLevel(response.nivel.nivel);
        this._router.navigate([ruta]);
      }, error => {
        this.stateMessage = true;
        this.message = "Datos Incorrectos";
      }
    );
  }

}