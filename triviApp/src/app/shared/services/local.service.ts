import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ResponseModel } from '../models/response.model';

@Injectable()
export class LocalService{

    private _responseModel = new BehaviorSubject<ResponseModel>(null);
    responseModel=this._responseModel.asObservable();

    private _questionError = new BehaviorSubject<any>(null);
    questionError=this._questionError.asObservable();

    private _level = new BehaviorSubject<any>(null);
    level=this._level.asObservable();

    public setResponseModel(responseModel: ResponseModel) {
      this._responseModel.next(responseModel);
    }

    public setQuestionError(errorQuestion:any){
      this._questionError.next(errorQuestion);
    }

    public setLevel(level:any){
      this._level.next(level);
    }
}