import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../../shared/services/custom.service';
import { LocalService } from '../../shared/services/local.service';
import { ResponseModel } from '../../shared/models/response.model';
import { User } from '../../shared/models/user.model';

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
  responseModel:ResponseModel = new ResponseModel();
  integrantesResponse:User[];
  nameGroup:string;
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
  markeLevel:number;
  constructor(  public _customService:CustomSevice,
                public _localService:LocalService,
                public _router:Router )
  {
    this.loader = true;
    this._localService.responseModel.subscribe(
      response => {
        console.log(response);
        this.responseModel = response;
        this.level = response.nivel.nivel + 1;
        this.integrantesResponse = response.users;
        this.nameGroup = response.teamName;
        this.customOptions(this.level);
      }
    )
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
    var nivel = '?categories='+this.level+'&per_page=50';
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
    for (let i = 0; i < this.integrantesResponse.length; i++) {
      this.integrantes.integrante.push({"nombre":this.integrantesResponse[i]['name'],"image":this.ruta+"bien.png"});
    }
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
    this._localService.setLevel(this.level - 1);
    if(this.countAnswer >= 30){
      this.navigate('./home/video');
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

    switch (nivel) {
      case 2:
        this.markeLevel = 14;
        break;
      case 3:
        this.markeLevel = 85;
        break;
      case 4:
        this.markeLevel = 156;
        break;
      case 5:
        this.markeLevel = 227;
        break;
      case 6:
        this.markeLevel = 299;
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
    location.href ="./home";
  }

  navigate(path:string):void{
    this._router.navigate([path]);
  }

}