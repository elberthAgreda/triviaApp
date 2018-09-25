import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< Updated upstream
import { LocalService } from '../../shared/services/local.service';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  private level:number;
  
<<<<<<< Updated upstream
  constructor( private _router:Router, private _localService:LocalService ) {
    this._localService.responseModel.subscribe(
      response => console.log(response)
    );
=======
  constructor( private _router:Router ) {
>>>>>>> Stashed changes
    this.level = 2;
  }

  ngOnInit() {
  }

  private goLevel():void{
    this.navigate('./home/nivel/'+this.level);
  }

  private navigate(path:string):void{
    this._router.navigate([path]);
  }

}