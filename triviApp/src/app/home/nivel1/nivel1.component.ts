import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trivia-nivel',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component implements OnInit {

  @Input() preguntas:any;
  private preguntaActiva:any;
  private numQuestion:number;
  private optionAnswer:string;
  private showQuestion:boolean;
  private showIntroduction:boolean;
  private countAnswer:number;
  private countQuestion:number;

  constructor() {
    this.numQuestion = 0;
    this.showIntroduction = true;
    this.showQuestion = false;
    this.countAnswer = 0;
  }

  ngOnInit() {
    this.preguntaActiva = this.preguntas[this.numQuestion];
    this.countQuestion = this.preguntas.length;
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
    if(this.countAnswer >= 2){
      alert("Gano el nivel");
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

}