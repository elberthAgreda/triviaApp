import { Component, OnInit } from '@angular/core';
import { Nivel } from '../../shared/models/nivel.model';
import { CustomSevice } from '../../shared/services/custom.service';
import { LocalService } from '../../shared/services/local.service';
import { ResponseModel } from '../../shared/models/response.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  
  nivelSave:Nivel = new Nivel();
  level:number;

  constructor( public _customService:CustomSevice, public _localService:LocalService )
  {
    this._localService.responseModel.subscribe(
      response => {
        this.nivelSave = response.nivel;
      }
    );
    this._localService.level.subscribe( ()=> this.level );
  }

  ngOnInit() {
    if(this.nivelSave != undefined)
      this.saveLevel();
  }

  saveLevel():void{
    this.nivelSave.nivel = this.level;
    this._customService.saveProgress(this.nivelSave).subscribe(
      response => {
        console.log("ok");
      }, error => {
        console.log(error);
      }
    );
  }

}