import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../shared/services/custom.service';
import { LocalService } from '../shared/services/local.service';
import { ResponseModel } from '../shared/models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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

  ngOnInit() {}

  authentication():void{
    this.user = {"userName":this.username, "password":this.password}
    this._customService.login<ResponseModel>(this.user).subscribe(
      response => {
        if ( response.userName != null ){
          this._localService.setResponseModel(response);
          this._router.navigate(['./video']);
        }
      }, error => {
        this.stateMessage = true;
        this.message = "Datos Incorrectos";
      }
    );
  }

}