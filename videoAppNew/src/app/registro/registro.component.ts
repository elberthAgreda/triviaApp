import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { User } from '../shared/models/user.model';
import { CustomSevice } from '../shared/services/custom.service';
import { Router } from '@angular/router';
import { UserData } from '../shared/models/userData.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  message:boolean = false;
  txtMessage:string = '';
  userData:UserData = new UserData();
  ciudades:any[];
  agencias:any[];
  loader: boolean = false;
  userRegister:Register = new Register();
  user1:User = new User();
  user2:User = new User();
  user3:User = new User();
  user4:User = new User();
  user5:User = new User();

  constructor( public _customService:CustomSevice, public _router:Router ) {
    this.ciudades = [];
    this.agencias = [];
  }

  ngOnInit() {
    this.loader = true;
    this.getCiudades();
    this.getAgencias();
  }

  getCiudades():void{
    this._customService.cities<any>(this.userData).subscribe(
      (ciuadades: { listado: any[]; }) => {
        this.ciudades = ciuadades.listado;
      }
    );
  }

  getAgencias():void{
    this._customService.agencies<any>(this.userData).subscribe(
      (agencias: { listado: any[]; }) => { 
        this.agencias = agencias.listado;
        this.loader = false;
      }
    );
  }

  registerForm(): void {
    this.loader = true;
    var tmpS = [];
    var ruta = "./login";
    tmpS.push(this.user1);
    tmpS.push(this.user2);
    // Validar campos no obligatorios
    if(this.user3.name != null || this.user3.documentId != null)
      tmpS.push(this.user3);
    if(this.user4.name != null || this.user4.documentId != null)
      tmpS.push(this.user4);
    if(this.user5.name != null || this.user5.documentId != null)
      tmpS.push(this.user5);
    // Agregar datos al userRegister
    this.userRegister.users = tmpS;
    this.userRegister.teamName = this.userRegister.username.replace(/\s*$/,'');
    this.userRegister.username = this.userRegister.username.replace(/\s*$/,'');
    this.userRegister.username = this.userRegister.username.toUpperCase();
    this._customService.register(this.userRegister).subscribe(
      response => {
        this.message = true;
        this.loader = false;
      }, error => {
        this.loader = false;
        if(error.status == 200){
          this.txtMessage = "Grupo: " + this.userRegister.teamName + " registrado correctamente";
          this._router.navigate([ruta]);
        }
        else
          this.txtMessage = "El nombre del grupo o uno de los usuarios ya existen, por favor escribe un nuevo nombre o validar los usuarios";
        this.message = true;
      }
    );
  }

}