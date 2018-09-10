import { Component, OnInit } from '@angular/core';
import { CustomSevice } from '../shared/services/custom.service';

@Component({
  selector: 'trivia-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  
  public preguntas:any;
  private visibility:boolean = false;
  public nivel = '?categories='+2;

  constructor(private _customService:CustomSevice){}

  ngOnInit() {
    this.getPreguntas();
  }

  public getPreguntas():void{
    this._customService.getPreguntas(this.nivel).subscribe(
      preguntas => {
        this.preguntas = preguntas;
        this.visibility = true;
      }
    );
  }

}
