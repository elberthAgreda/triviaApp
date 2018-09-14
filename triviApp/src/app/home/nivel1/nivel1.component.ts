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
  private integrantes:any;
  private level:number;
  private preguntaActiva:any;
  private numQuestion:number;
  private optionAnswer:string;
  private showQuestion:boolean;
  private showAnswer:boolean;
  private showIntroduction:boolean;
  private countAnswer:number;
  private countQuestion:number;
  public loader:boolean;
  /* Custom */
  public ruta:string = "../../../assets/img/";
  public imgRespuesta:string;
  public numIntegrante:number;
  public integranteActivo:string;

  constructor(  private _customService:CustomSevice,
                private _nivel:ActivatedRoute,
                private _router:Router )
  {
    this.loader = true;
    this._nivel.params.subscribe(response => this.level = response['id']);
    this.numQuestion = 0;
    this.showIntroduction = true;
    this.showQuestion = false;
    this.showAnswer = false;
    this.countAnswer = 0;
    this.numIntegrante = 0;
  }

  ngOnInit() {
    this.getIntegrantes();
    this.getPreguntas();
  }

  public getPreguntas():void{
    var nivel = '?categories='+this.level;
    this._customService.getPreguntas(nivel).subscribe(
      preguntas => {
        this.preguntas = preguntas;
        console.log(preguntas);
        this.preguntaActiva = this.preguntas[this.numQuestion];
        this.countQuestion = this.preguntas.length;
        this.loader = false;
      }
    );
  }

  public getIntegrantes():void{
    this.integrantes = {integrante:[]};
    this.integrantes.integrante.push({"nombre":"Elberth","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Jairo","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Carlos","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Lucia","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Ana","image":this.ruta+"bien.png"});
  }

  private showQuestions():void{
    this.showIntroduction = false;
    this.showQuestion = true;
  }

  private nextQuestion():void{
    // Reestablece el numIntegrante a 0 si ya todos los participantes respondieron
    if(this.numIntegrante === 4)
      this.numIntegrante = 0;
    // Valida si la respuesta es correcta
    if(this.preguntaActiva.post_meta_fields.respuesta_correcta == this.optionAnswer){
      this.countAnswer = this.countAnswer + 1;
      // Cambia icono si la respuesta es correcta
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"bien2.png";
      this.imgRespuesta = this.ruta+"correcto.png";
    }
    else{
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"error2.png";
      this.imgRespuesta = this.ruta+"error.png";
    }
    // Muestra el integrante que debe responder
    this.integranteActivo = this.integrantes['integrante'][this.numIntegrante+1]['nombre'];
    this.numIntegrante = this.numIntegrante + 1;
    // Pasar a la siguiente pregunta
    this.numQuestion = this.numQuestion + 1;
    if(this.preguntas[this.numQuestion] == undefined || this.preguntas[this.numQuestion] == null){
      this.finishLevel();
    }else{
      this.preguntaActiva = this.preguntas[this.numQuestion];
      this.showAnswer = true;
    }
  }

  private finishLevel():void{
    this.showQuestion = false;
    this.preguntaActiva = [];
    //var tmpResult = Math.round(this.countAnswer / this.countQuestion);
    //console.log(tmpResult);
    if(this.countAnswer >= 1){
      //this.navigate('./home/video');
    }
    else{
      alert("Perdiste tonto");
    }
    alert("numero de respuestas correctas: "+this.countAnswer + " de "+this.countQuestion);
  }

  private showIntoductions():void{
    this.showIntroduction = true;
    this.showAnswer = false;
    this.showQuestion = false;
  }

  private navigate(path:string):void{
    this._router.navigate([path]);
  }

}