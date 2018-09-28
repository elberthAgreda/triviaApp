import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Nivel } from '../../shared/models/nivel.model';
import { CustomSevice } from '../../shared/services/custom.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  
  urlIframe:SafeResourceUrl;
  parentRouteId:any;
  nivelSave:Nivel = new Nivel();

  constructor( public sanitizer:DomSanitizer, public _customService:CustomSevice ) {
    this.parentRouteId = "http://unoraya.com/";
    this.urlIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.parentRouteId);
  }

  ngOnInit() {
    this.saveLevel();
  }

  saveLevel():void{
    this.nivelSave.nivel = 2;
    this.nivelSave.userName = "lucasian2";
    this._customService.saveProgress(this.nivelSave).subscribe(
      response => {
        console.log("ok");
      }, error => {
        console.log(error);
      }
    );
  }

}