import { Component, OnInit } from '@angular/core';
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
      this.saveLevel();
      this.state = true;
    }
  }

  saveLevel():void{
    this.nivelSave.nivel = this.level['level'];
    this._customService.saveProgress(this.nivelSave).subscribe(
      response => {console.log("ok");}
      , error => {
        if(error.status == 200)
          this.message = "Felicitaciones paso al nivel "+this.level['level'];
        else
          this.message = "No paso de nivel, contactar con el administrador";
      }
    );
  }

  salir():void{
    location.href ="./";
  }

}