import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { CustomSevice } from '../shared/services/custom.service';
import { Router } from '@angular/router';
import { UserData } from '../shared/models/userData.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
  message:boolean = false;
  txtMessage:string = '';
  userData:UserData = new UserData();
  ciudades:any[];
  agencias:any[];
  loader: boolean = false;
  userRegister:Register = new Register();

  constructor( public _customService:CustomSevice, public _router:Router ) {
    this.ciudades = [];
    this.agencias = [];
  }

  ngOnInit() {
    this.loader = true;
    this.getCiudades();
  }

  getCiudades():void{
    this._customService.cities<any>(this.userData).subscribe(
      (ciuadades: { listado: any[]; }) => {
        this.ciudades = ciuadades.listado;
        this.loader = false;
      }
    );
  }

  getAgencias(ciudad: string):void{
    this._customService.agencies<any>(ciudad).subscribe(
      (agencias: { listado: any[]; }) => { 
        this.agencias = agencias.listado;
        this.loader = false;
      }
    );
  }

  registerForm(): void {
    this.loader = true;
    const ruta = "./login";
    // Agregar datos al userRegister
  
    this._customService.register(this.userRegister).subscribe(
      response => {
        this.message = true;
        this.loader = false;
      }, error => {
        this.loader = false;
        if(error.status == 200){
          this.txtMessage = "Grupo: " + this.userRegister.username + " registrado correctamente";
          this._router.navigate([ruta]);
        }
        else
          this.txtMessage = "No es posible registrar el usuario";
        this.message = true;
      }
    );
  }

}