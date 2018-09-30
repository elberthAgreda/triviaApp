import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../shared/services/local.service';
import { ResponseModel } from '../../shared/models/response.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  level:number;
  responseModel:ResponseModel = new ResponseModel();
  
  constructor( public _router:Router, public _localService:LocalService ) {
    this._localService.responseModel.subscribe(
      response => {
        this.responseModel = response;
        this.level = this.responseModel.nivel.nivel;
      }
    );
  }

  ngOnInit() {
    if(this.level != undefined)
      this.goLevel();
  }

  goLevel():void{
    var ruta = './home/nivel/'+this.level;
    this._router.navigate([ruta]);
  }

}