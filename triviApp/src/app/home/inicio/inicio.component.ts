import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../shared/services/local.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  level:number;
  
  constructor( public _router:Router, public _localService:LocalService ) {
    this._localService.responseModel.subscribe(
      response => console.log(response)
    );
    this.level = 2;
  }

  ngOnInit() {
  }

  goLevel():void{
    this.navigate('./home/nivel/'+this.level);
  }

  navigate(path:string):void{
    this._router.navigate([path]);
  }

}