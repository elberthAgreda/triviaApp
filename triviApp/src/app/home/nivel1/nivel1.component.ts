import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomSevice } from '../../shared/services/custom.service';

@Component({
  selector: 'trivia-nivel',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component implements OnInit {

  private preguntas:any;
  private level:number;
  private preguntaActiva:any;
  private numQuestion:number;
  private optionAnswer:string;
  private showQuestion:boolean;
  private showIntroduction:boolean;
  private countAnswer:number;
  private countQuestion:number;
  public loader:boolean;

  constructor(  private _customService:CustomSevice,
                private _nivel:ActivatedRoute,
                private _router:Router )
  {
    this.loader = true;
    this._nivel.params.subscribe(response => this.level = response['id']);
    this.numQuestion = 0;
    this.showIntroduction = true;
    this.showQuestion = false;
    this.countAnswer = 0;
  }

  ngOnInit() {
    this.getPreguntas();
  }

  public getPreguntas():void{
    var nivel = '?categories='+this.level;
    this._customService.getPreguntas(nivel).subscribe(
      preguntas => {
        this.preguntas = preguntas;
        this.preguntaActiva = this.preguntas[this.numQuestion];
        this.countQuestion = this.preguntas.length;
        this.loader = false;
      }
    );
  }

  private showQuestions():void{
    this.showIntroduction = false;
    this.showQuestion = true;
  }

  private nextQuestion():void{
    // Validar si la respuesta es correcta
    if(this.preguntaActiva.post_meta_fields.respuesta_correcta == this.optionAnswer){
      this.countAnswer = this.countAnswer + 1;
      alert("Respuesta Correcta");
    }
    else{
      alert("Respuesta Incorrecta");
    }
    // Pasar a la siguiente pregunta
    this.numQuestion = this.numQuestion + 1;
    if(this.preguntas[this.numQuestion] == undefined || this.preguntas[this.numQuestion] == null){
      this.finishLevel();
    }else{
      this.preguntaActiva = this.preguntas[this.numQuestion];
      this.showIntoductions();
    }
  }

  private finishLevel():void{
    this.showQuestion = false;
    this.preguntaActiva = [];
    //var tmpResult = Math.round(this.countAnswer / this.countQuestion);
    //console.log(tmpResult);
    if(this.countAnswer >= 1){
      alert("Gano el nivel");
      this.navigate('./home/video');
    }
    else{
      alert("Perdiste tonto");
    }
    alert("numero de respuestas correctas: "+this.countAnswer + " de "+this.countQuestion);
  }

  private showIntoductions():void{
    this.showIntroduction = true;
    this.showQuestion = false;
  }

  private navigate(path:string):void{
    this._router.navigate([path]);
  }

}