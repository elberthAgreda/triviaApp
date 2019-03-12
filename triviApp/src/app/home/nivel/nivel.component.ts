import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../../shared/services/custom.service';
import { LocalService } from '../../shared/services/local.service';
import { ResponseModel } from '../../shared/models/response.model';
import { User } from '../../shared/models/user.model';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInDown, slideInUp, slideInLeft } from 'ng-animate';

@Component({
  selector: 'trivia-nivel',
  templateUrl: './nivel.component.html',
  animations: [
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
  ],
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {
  loader: boolean;
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
  responseModel:ResponseModel = new ResponseModel();
  integrantesResponse:User[];
  nameGroup:string;
  /* Custom */
  colorSvg:string;
  questionError:any[];
  errorNivel:boolean;
  ruta:string = "../../../assets/img/";
  rutaImgBackground:string;
  pathImgLevel:string = "nivel1";
  imgLevel:number = 1;
  imgRespuesta:string;
  numIntegrante:number;
  integranteActivo:string;
  numRonda:number;
  firstRonda:boolean;
  countError:number;
  countQuestionActive:number;
  markeLevel:number;
  constructor(  public _customService:CustomSevice,
                public _localService:LocalService,
                public _router:Router )
  {
    this.loader = true;
    this._localService.responseModel.subscribe(
      response => {
        this.responseModel = response;
        this.level = response.nivel.nivel + 1;
        this.integrantesResponse = response.users;
        this.nameGroup = response.teamName;
        this.customOptions(this.level);
      }
    )
    this.errorNivel = false;
    this.numQuestion = 0;
    this.countError = 0;
    this.showIntroduction = true;
    this.showQuestion = false;
    this.showAnswer = false;
    this.countAnswer = 0;
    this.numIntegrante = 0;
    this.numRonda = 0;
    this.firstRonda = true;
    this.countQuestionActive = 1;
    this.questionError = [];
    this.colorSvg = '#fff';
    this.markeLevel = 0;
  }

  ngOnInit() {
    this.getIntegrantes();
    this.getPreguntas();
  }

  // obtener las preguntas del servicio Wordpress
  getPreguntas():void{
    // Valida que solo deje ingresar el nivel 1 - temporal validacion
    if ( this.level > 3 ) {
      this._router.navigate(['./home/finalizado']);
    }
    var nivel = '?categories='+this.level+'&per_page=50';
    this._customService.getPreguntas(nivel).subscribe(
      preguntas => {
        // Generar random del arreglo de preguntas
        let tmpPreguntas = preguntas;
        for (var i = 49; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = tmpPreguntas[i];
          tmpPreguntas[i] = tmpPreguntas[j];
          tmpPreguntas[j] = temp;
        }
        this.preguntas = tmpPreguntas;
        this.preguntaActiva = this.preguntas[this.numQuestion];
        this.countQuestion = this.preguntas.length;
        this.loader = false;
      }
    );
  }

  // obtener y crear el arreglo de integrantes
  getIntegrantes():void{
    this.integrantes = {integrante:[]};
    for (let i = 0; i < this.integrantesResponse.length; i++) {
      this.integrantes.integrante.push({"nombre":this.integrantesResponse[i]['name'],"image":this.ruta+"bien.png"});
    }
  }

  // mostrar contenedor de preguntas
  showQuestions():void{
    this.showIntroduction = false;
    this.showQuestion = true;
  }

  // Cambiar a la siguiente pregunta
  nextQuestion():void{
    if(this.optionAnswer != undefined){
      this.validateQuestion();
      if(this.imgLevel >= 5)
        this.imgLevel = 0;
      this.imgLevel = this.imgLevel + 1;
    }
    else
      alert("Seleccionar una respuesta");
  }

  // Validar preguntas
  validateQuestion():void{
    // Contador de preguntas
    if(this.countQuestion !== this.countQuestionActive)
      this.countQuestionActive = this.countQuestionActive + 1;
    // Reestablece el numIntegrante a 0 si ya todos los participantes respondieron
    if(this.numIntegrante === this.integrantesResponse.length){
      this.numIntegrante = 0;
      this.numRonda = 0;
    }
    // Valida si la respuesta es correcta
    if(this.preguntaActiva.post_meta_fields.respuesta_correcta == this.optionAnswer){
      this.countAnswer = this.countAnswer + 1;
      // Valida si el contador de correctas es igual a 30
      if(this.countAnswer >= 30)
        this.finishLevel();  
      // Cambia icono si la respuesta es correcta
      this.sonidoCorrecto();
      this.markeLevel = this.markeLevel + 23.33;
      this.colorSVG(true);
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"carita_feliz.gif";
      this.imgRespuesta = this.ruta+"respuesta_correcta.gif";
    }
    else{
      this.questionError.push(this.preguntaActiva.post_meta_fields);
      this.sonidoError();
      this.colorSVG(false);
      this.countError = this.countError + 1;
      this.integrantes['integrante'][this.numIntegrante]['image'] = this.ruta+"carita_triste.gif";
      this.imgRespuesta = this.ruta+"respuesta_incorrecta.gif";
    }
    // Muestra el integrante que debe responder
    if(this.numRonda === 0 && this.firstRonda)
      this.integranteActivo = this.integrantes['integrante'][1]['nombre'];

    if(this.numRonda >= 0 && !this.firstRonda && this.numRonda <= this.integrantesResponse.length - 1){
      if(this.numIntegrante >= this.integrantesResponse.length - 1 )
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

  // Termina el nivel del juego
  finishLevel():void{
    this.showQuestion = false;
    this.showAnswer = true;
    this.preguntaActiva = [];
    var tmpLevel = {level:this.level, state:true}
    this._localService.setLevel(tmpLevel);
    if(this.countAnswer >= 30){
      this.navigate('./home/video');
    }
    else{
      this.errorNivel = true;
      this.showAnswer = false;
      this._localService.setQuestionError(this.questionError);
    }
  }

  // mostrar introduccion
  showIntoductions():void{
    this.showIntroduction = true;
    this.showAnswer = false;
    this.showQuestion = false;
    this.optionAnswer = null;
    this.colorSvg = '#fff';
  }

  // Custom nivel
  customOptions(nivel:number):void{
    switch (nivel) {
      case 2:
        this.pathImgLevel = "nivel1";
        this.rutaImgBackground = "nivel1/fondo-01.jpg";
        break;
      case 3:
        this.pathImgLevel = "nivel2";
        this.rutaImgBackground = "nivel2/fondo-02.jpg";
        break;
      case 4:
        this.pathImgLevel = "nivel3";
        this.rutaImgBackground = "nivel3/fondo-03.jpg";
        break;
      case 5:
        this.pathImgLevel = "nivel4";
        this.rutaImgBackground = "nivel4/fondo-04.jpg";
        break;
      case 6:
        this.pathImgLevel = "nivel5";
        this.rutaImgBackground = "nivel5/fondo-05.jpg";
        break;
      default:
        break;
    }
  }

  colorSVG(answer:boolean){
    if ( answer )
      this.colorSvg = '#66cccc';
    else
      this.colorSvg = '#ff3366';
  }

  sonidoCorrecto(){
    var audioC = new Audio();
    audioC.src = "../../../assets/audio/bien.mp3";
    audioC.load();
    audioC.play();
  }

  sonidoError(){
    var audioE = new Audio();
    audioE.src = "../../../assets/audio/error.mp3";
    audioE.load();
    audioE.play();
  }

  // Salir de la aplicación
  logout():void{
    location.href ="./";
  }

  // Redirecionar
  navigate(path:string):void{
    this._router.navigate([path]);
  }

}