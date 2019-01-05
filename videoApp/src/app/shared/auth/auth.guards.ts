import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LocalService } from '../services/local.service';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class AuthGuard implements CanActivate {

    validate:ResponseModel;
    onNavigation:boolean;

  constructor(  public _localService: LocalService ){}
  
  canActivate():boolean{
    this._localService.responseModel.subscribe(
      response => {
        this.validate = response;
        if(this.validate != null)
            this.onNavigation = true;
        else
            this.onNavigation = false;
      }
    );
    return this.onNavigation;
  }

}