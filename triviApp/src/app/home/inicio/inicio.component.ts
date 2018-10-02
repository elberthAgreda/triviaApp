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
  message:string;

  constructor( public _router:Router, public _localService:LocalService ) {
    this._localService.level.subscribe(
      response => {
        this.level =  response + 1;
      }
    );
  }

  ngOnInit() {
    switch (this.level) {
      case 2:
        this.message = "Acá empieza la aventura en la cual juntos deben superar 5 niveles.";
        break;
      case 3:
        this.message = "texto nivel 2";
        break;
      case 4:
        this.message = "texto nivel 3";
        break;
      case 5:
        this.message = "texto nivel 4";
        break;
      case 6:
        this.message = "texto nivel 5";
        break;
      default:
        this.message = "Sin nivel";
        break;
    }
  }

  goLevel():void{
    var ruta = './home/nivel/';
    this._router.navigate([ruta]);
  }

}