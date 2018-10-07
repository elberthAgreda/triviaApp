import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { User } from '../shared/models/user.model';
import { CustomSevice } from '../shared/services/custom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  message:boolean = false;
  txtMessage:string;
  userRegister:Register = new Register();
  user1:User = new User();
  user2:User = new User();
  user3:User = new User();
  user4:User = new User();
  user5:User = new User();

  constructor( public _customService:CustomSevice, public _router:Router ) {}

  ngOnInit() {}

  registerForm():void{
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
    this.userRegister.teamName = this.userRegister.username;
    this._customService.register(this.userRegister).subscribe(
      response => {
        this.message = true;
      }, error => {
        if(error.status == 200){
          this.txtMessage = "Grupo: " + this.userRegister.teamName + " registrado correctamente";
          this._router.navigate([ruta]);
        }  
        else
          this.txtMessage = "No es posible registrar el grupo, por favor valide si los datos ingresados son correctos";
        this.message = true;
      }
    );
  }

}