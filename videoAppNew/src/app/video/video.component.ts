import { Component, OnInit } from '@angular/core';
import { CustomSevice } from '../shared/services/custom.service';
import { UserData } from '../shared/models/userData.model';
import { Puntuacion } from '../shared/models/puntuacion.model';
import { VideoModel } from '../shared/models/video.model';
import { LocalService } from '../shared/services/local.service';
import { AppVariable } from '../shared/config/app.variables';
declare var $: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  agencias: any[];
  responseModel: any;
  userData: any;
  videoData: any;
  baseData = '../../assets/img/fondovideo.jpg';
  baseImage = AppVariable.baseImages;
  imgActivePlayOrPause = 'boton_play-01.svg';
  dataVoto: any;
  showVideo: boolean;
  today: Date;
  hideContent = false;

  constructor(
    private _customService: CustomSevice,
    private _localService: LocalService
  ) {
    this.showVideo = false;
    this.agencias = [];
    this.dataVoto = new Puntuacion();
    this.videoData = new VideoModel();
    this.videoData.video = '';
    this.videoData.puntuacion = new Puntuacion();
    this.userData = new UserData();
    this.today = new Date();
    this._localService.responseModel.subscribe((response) => {
      this.responseModel = response;
    });
  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(): void {
    this._customService.getVideos<any[]>().subscribe((response) => {
      console.log(response);
      const groupBy = (array: any, key: any) => {
        return array.reduce((result: any, currentValue: any) => {
          (result[currentValue[key]['regional'][0]] = result[currentValue[key]['regional'][0]] || []).push(
            currentValue,
          );
          return result;
        }, []);
      };
      this.agencias = groupBy(response, 'data');
      console.log(this.agencias);
    });
  }

  showVideoBase(estado: boolean): void {
    this.showVideo = estado;
  }

  viewAgencie(data: any): void {
    const tmpData = data.data;
    this.videoData.titulo = tmpData.titulo[0];
    this.videoData.descripcion = tmpData.descripcion[0];
    this.videoData.imagen = tmpData.imgurl[0];
    this.videoData.video = tmpData.video_url[0];
    // Puntuacion
    this.videoData.puntuacion.video = tmpData.id[0];
    this.videoData.puntuacion.agencia = tmpData.id[0];
    this.videoData.puntuacion.usuario = this.responseModel.userName;
    // const dateAc =
    //   this.today.getDate() +
    //   '/' +
    //   this.today.getMonth() +
    //   '/' +
    //   this.today.getFullYear();
    // this.videoData.puntuacion.fecha = dateAc;
    this.showVideo = true;
    $('html,body').animate({ scrollTop: 0 }, 1000);
  }

  saveVote(): void {
    this.dataVoto = this.videoData.puntuacion;
    this._customService.saveVote(this.dataVoto).subscribe(
      (response) => {
        alert('Voto almacenado exitosamente');
      },
      (error) => {
        if (!error.error) {
          alert('Voto almacenado exitosamente');
          return;
        } 
        alert(error.error.errorMsg);
      }
    );
  }

  playPause() {
    var myVideo: any = document.getElementById("videoCampana");
    if ( myVideo.paused ) {
      this.hideContent = true;
      myVideo.play();
      this.imgActivePlayOrPause = 'pausa_Mesa-de-trabajo-1.svg';

    } 
    else {
      myVideo.pause();
      this.hideContent = false;
      this.imgActivePlayOrPause = 'boton_play-01.svg';
    }
  }

  vidEnded() {
    this.hideContent = false;
    this.imgActivePlayOrPause = 'boton_play-01.svg';
  }

}
