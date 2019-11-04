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
  loader: boolean;
  message:string;

  constructor(  public _router: Router,
                public _customService: CustomSevice,
                public _localService: LocalService ) {
                  this.loader = true;
                }

  ngOnInit() {
    this.loader = false;
  }

  authentication(): void {
    this.loader = true;
    this.username = this.username.replace(/\s*$/,'');
    this.username = this.username.toUpperCase();
    this.user = { 'userName': this.username, 'password': this.password };
    const ruta = './home/inicio/';
    this._customService.login<ResponseModel>(this.user).subscribe(
      response => {
        if ( response.users.length == 0 ) {
          this.message = 'Este usuario fue renovado';
        }
        this._localService.setResponseModel(response);
        this._localService.setLevel(response.nivel.nivel);
        this._router.navigate([ruta]);
        this.loader = false;
      }, error => {
        this.stateMessage = true;
        this.loader = false;
        this.message = 'Datos Incorrectos';
      }
    );
  }

  registrar():void{
    var rutaRegistro = "./registro";
    this._router.navigate([rutaRegistro]);
  }

}