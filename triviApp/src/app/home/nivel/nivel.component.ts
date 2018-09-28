import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomSevice } from '../../shared/services/custom.service';
import { LocalService } from '../../shared/services/local.service';
import { Nivel } from '../../shared/models/nivel.model';

@Component({
  selector: 'trivia-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  preguntas:any;
  integrantes:any;
  level:number;
  preguntaActiva:any;
  numQuestion:number;
  optionAnswer:string;
  showQuestion:boolean;
  showAnswer:boolean;
  showIntroduction:boolean;
  countAnswer:number;
  countQuestion:number;
  loader:boolean;
  /* Custom */
  questionError:any[];
  errorNivel:boolean;
  ruta:string = "../../../assets/img/";
  imgRespuesta:string;
  numIntegrante:number;
  integranteActivo:string;
  numRonda:number;
  firstRonda:boolean;
  countQuestionActive:number;
  constructor(  public _customService:CustomSevice,
                public _nivel:ActivatedRoute,
                public _localService:LocalService,
                public _router:Router )
  {
    this.loader = true;
    this._nivel.params.subscribe(response => this.level = response['id']);
    this.errorNivel = false;
    this.numQuestion = 0;
    this.showIntroduction = true;
    this.showQuestion = false;
    this.showAnswer = false;
    this.countAnswer = 0;
    this.numIntegrante = 0;
    this.numRonda = 0;
    this.firstRonda = true;
    this.countQuestionActive = 1;
    this.questionError = [];
  }

  ngOnInit() {
    this.getIntegrantes();
    this.getPreguntas();
    this.soundGame();
  }

  getPreguntas():void{
    var nivel = '?categories='+this.level+'&per_page=3';
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

  getIntegrantes():void{
    this.integrantes = {integrante:[]};
    this.integrantes.integrante.push({"nombre":"Elberth","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Jairo","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Carlos","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Lucia","image":this.ruta+"bien.png"});
    this.integrantes.integrante.push({"nombre":"Ana","image":this.ruta+"bien.png"});
  }

  showQuestions():void{
    this.showIntroduction = false;
    this.showQuestion = true;
  }

  nextQuestion():void{
    // Contador de preguntas
    this.countQuestionActive = this.countQuestionActive + 1;
    // Reestablece el numIntegrante a 0 si ya todos los participantes respondieron
    if(this.numIntegrante === 5){
      this.numIntegrante = 0;
      this.numRonda = 0;
    }
    // Valida si la respuesta es correcta
    if(this.preguntaActiva.post_meta_fields.respuesta_correcta == this.optionAnswer){
      this.countAnswer = this.countAnswer + 1;
      // Cambia icono si la respuesta es correcta
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"bien2.png";
      this.imgRespuesta = this.ruta+"correcto.png";
    }
    else{
      this.questionError.push(this.preguntaActiva.post_meta_fields);
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"error2.png";
      this.imgRespuesta = this.ruta+"error.png";
    }
    // Muestra el integrante que debe responder
    if(this.numRonda === 0 && this.firstRonda)
      this.integranteActivo = this.integrantes['integrante'][1]['nombre'];

    if(this.numRonda >= 0 && !this.firstRonda && this.numRonda <= 4){
      if(this.numIntegrante >= 4 )
        this.integranteActivo = this.integrantes['integrante'][0]['nombre'];
      else
        this.integranteActivo = this.integrantes['integrante'][this.numIntegrante+1]['nombre'];
    }

    // Pasar a la siguiente pregunta
    this.numIntegrante = this.numIntegrante + 1;
    this.numQuestion = this.numQuestion + 1;
    // Validar si ya finalizo las preguntas
    if(this.preguntas[this.numQuestion] == undefined || this.preguntas[this.numQuestion] == null){
      this.finishLevel();
    }else{
      this.preguntaActiva = this.preguntas[this.numQuestion];
      this.showQuestion = false;
      this.showAnswer = true;
    }
    // Contador para el numero de rondas
    this.numRonda = this.numRonda + 1;
    this.firstRonda = false;
  }

  finishLevel():void{
    this.showQuestion = false;
    this.showAnswer = true;
    this.preguntaActiva = [];
    //var tmpResult = Math.round(this.countAnswer / this.countQuestion);
    //console.log(tmpResult);
    if(this.countAnswer >= 1){
      this.navigate('./home/video/2');
    }
    else{
      this.errorNivel = true;
      this.showAnswer = false;
      this._localService.setQuestionError(this.questionError);
    }
  }

  showIntoductions():void{
    this.showIntroduction = true;
    this.showAnswer = false;
    this.showQuestion = false;
    this.optionAnswer = null;
  }

  customOptions(nivel:number):void{
    var path:string;
    switch (nivel) {
      case 1:
        path = "...";
        break;
      case 2:
        path = "...";
        break;
      case 3:
        path = "...";
        break;
      case 4:
        path = "...";
        break;
      case 5:
        path = "...";
        break;
      default:
        break;
    }
  }

  soundGame():void{
    var audio = new Audio();
    audio.src = "http://cepi.do.grafos.tech/wp-content/themes/cepi/img/forest/sound/Forest.mp3";
    audio.load();
    audio.loop = true;
    setTimeout(function() {
      audio.play();
    }, 200);
  }

  logout():void{
    this.navigate('./login');
  }

  navigate(path:string):void{
    this._router.navigate([path]);
  }

}