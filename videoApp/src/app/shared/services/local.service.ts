import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class LocalService{

    private _responseModel = new BehaviorSubject<ResponseModel>(null);
    responseModel=this._responseModel.asObservable();

    public setResponseModel(responseModel: ResponseModel) {
      this._responseModel.next(responseModel);
    }

}