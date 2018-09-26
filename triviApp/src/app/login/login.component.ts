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

  constructor(  private _router:Router,
                private _customService:CustomSevice,
                private _localService:LocalService ) { }

  private username:string;
  private password:string;

  ngOnInit() {
  }


  private authentication():void{
    var tmpLogin = '?username='+this.username + "&password=" + this.password;
    var path = './home/inicio/';

    this._customService.login<ResponseModel>(tmpLogin).subscribe(
      response => {
        console.log(response);
        this._localService.setResponseModel(response);
        this._router.navigate([path]);
      }, error => {
        console.log(error);
      }
    );
  }

}