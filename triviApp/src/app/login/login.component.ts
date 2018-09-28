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

  constructor(  public _router:Router,
                public _customService:CustomSevice,
                public _localService:LocalService ){}

  ngOnInit() {
  }

  authentication():void{
    var path = './home/inicio/';
    this.user = {"userName":this.username, "password":this.password}
    this._customService.login<ResponseModel>(this.user).subscribe(
      response => {
        this._localService.setResponseModel(response);
        this._router.navigate([path]);
      }, error => {
        console.log(error);
      }
    );
  }

}