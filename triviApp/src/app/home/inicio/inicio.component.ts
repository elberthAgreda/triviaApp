import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../../shared/services/local.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  loader: boolean;
  level:number;
  messageImg:string;
  rutaImg:string;
  positionMarker:number;

  constructor( public _router:Router, public _localService:LocalService ) {
    this.loader = true;
    this._localService.level.subscribe(
      response => {
        this.level =  response + 1;
      }
    );
  }

  ngOnInit() {
    var rutaAssets = "../../../assets/img/";
    switch (this.level) {
      case 2:
        this.messageImg = rutaAssets + 'nivel1/texto_niveles-01.png';
        this.rutaImg = rutaAssets + 'nivel1/fondo-01.jpg';
        this.positionMarker = 20;
        break;
      case 3:
        this.messageImg = rutaAssets + 'nivel2/texto_niveles-02.png';
        this.rutaImg = rutaAssets + 'nivel2/fondo-02.jpg';
        this.positionMarker = 169;
        break;
      case 4:
        this.messageImg = rutaAssets + 'nivel3/texto_niveles-03.png';
        this.rutaImg = rutaAssets + 'nivel3/fondo-03.jpg';
        this.positionMarker = 318;
        break;
      case 5:
        this.messageImg = rutaAssets + 'nivel4/texto_niveles-04.png';
        this.rutaImg = rutaAssets + 'nivel4/fondo-04.jpg';
        this.positionMarker = 470;
        break;
      case 6:
        this.messageImg = rutaAssets + 'nivel5/texto_niveles-05.png';
        this.rutaImg = rutaAssets + 'nivel5/fondo-05.jpg';
        this.positionMarker = 620;
        break;
      case 7:
        this._router.navigate(['./home/finalizado']);
        break;
    }
    this.loader = false;
  }

  goLevel():void{
    let ruta = './home/nivel/';
    this._router.navigate([ruta]);
  }

}