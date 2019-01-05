import { Component, OnInit } from '@angular/core';
import { CustomSevice } from '../shared/services/custom.service';
import { UserData } from '../shared/models/userData.model';
import { Puntuacion } from '../shared/models/puntuacion.model';
import { VideoModel } from '../shared/models/video.model';
import { ResponseModel } from '../shared/models/response.model';
import { LocalService } from '../shared/services/local.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

 
  agencias:any[];
  responseModel:ResponseModel;
  userData:UserData;
  videoData:VideoModel;
  dataVoto:Puntuacion;
  showVideo:boolean;

  constructor( private _customService:CustomSevice,
               private _localService:LocalService ) {
    this.showVideo = false;
    this.agencias = [];
    this.dataVoto = new Puntuacion();
    this.videoData = new VideoModel();
    this.videoData.imagen = "../../assets/img/fondovideo.jpg";
    this.videoData.video = null;
    this.videoData.puntuacion = new Puntuacion();
    this.userData = new UserData();
    this._localService.responseModel
    .subscribe( response => { this.responseModel = response; } );
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos():void{
    this._customService.getVideos<any[]>().subscribe(
      response => {
        this.agencias = response;
      }
    );
  }

  showVideoBase(estado:boolean):void{
    this.showVideo = estado;
  }

  viewAgencie(data:any):void{
    this.videoData.titulo = data.post_meta_fields.titulo;
    this.videoData.descripcion = data.post_meta_fields.descripcion;
    this.videoData.imagen = data.post_meta_fields.imgUrl;
    this.videoData.video = data.post_meta_fields.video_url;
    // Puntuacion
    this.videoData.puntuacion.video = data.id;
    this.videoData.puntuacion.agencia = this.responseModel.agencia;
    this.videoData.puntuacion.usuario = this.responseModel.userName;
    this.videoData.puntuacion.fecha = '11/01/2019';
  }

  saveVote():void{
    this.dataVoto = this.videoData.puntuacion;
    this._customService.saveVote(this.dataVoto).subscribe(
      response => { console.log(response); },
      error => { alert(error.message); }
    );
  }

  scores():void{
    this._customService.scores(this.userData).subscribe(
      response => { console.log(response); }
    );
  }

}