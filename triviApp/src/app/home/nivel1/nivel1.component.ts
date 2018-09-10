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

  constructor() {
    this.numQuestion = 0;
  }

  ngOnInit() {
    this.preguntaActiva = this.preguntas[this.numQuestion];
    console.log(this.preguntaActiva);
  }

  private nextQuestion():void{
    // Validar si la respuesta es correcta
    alert("respuesta correcta");

    // Pasar a la siguiente pregunta
    this.numQuestion = this.numQuestion + 1;
    console.log(this.numQuestion);
    this.preguntaActiva = this.preguntas[this.numQuestion];
    console.log(this.preguntaActiva);
  }

}
