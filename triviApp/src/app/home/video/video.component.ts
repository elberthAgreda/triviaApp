import { Component, OnInit, ViewChild } from '@angular/core';
import { Nivel } from '../../shared/models/nivel.model';
import { CustomSevice } from '../../shared/services/custom.service';
import { LocalService } from '../../shared/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  
  nivelSave:Nivel = new Nivel();
  level:number;
  state:boolean;
  message:string;
  rutaLevel:string;
  @ViewChild('myVideo') myVideo: any;
  
  constructor(  public _customService:CustomSevice,
                public _router:Router,
                public _localService:LocalService )
  {
    this._localService.responseModel.subscribe( response => this.nivelSave = response.nivel );
    this._localService.level.subscribe( response => { this.level = response; } );
    this.state = false;
  }

  ngOnInit() {
    if(this.level['state']){
      this.setupVideo();
      this.saveLevel();
      this.state = true;
    }
  }

  setupVideo(){
    var tmpLevel = 3;
    var rutaVideo = "https://www.w3schools.com/Html/";
    switch (tmpLevel) {
      case 1:
        this.rutaLevel = rutaVideo+'mov_bbb.mp4';
        break;
      case 2:
        this.rutaLevel = rutaVideo+'mov_bbb.mp4';
        break;
      case 3:
        this.rutaLevel = rutaVideo+'mov_bbb.mp4';
        break;
      case 4:
        this.rutaLevel = rutaVideo+'mov_bbb.mp4';
        break;
      case 5:
        this.rutaLevel = rutaVideo+'mov_bbb.mp4';
        break;
    }
    this.myVideo.nativeElement.play();
  }

  saveLevel():void{
    this.nivelSave.nivel = this.level['level'];
    this._customService.saveProgress(this.nivelSave).subscribe(
      response => {console.log("ok");}
      , error => {
        if(error.status == 200)
          this.message = "Felicitaciones, han pasado de nivel";
        else
          this.message = "No paso de nivel, contactar con el administrador";
      }
    );
  }

  salir():void{
    location.href ="./";
  }

}