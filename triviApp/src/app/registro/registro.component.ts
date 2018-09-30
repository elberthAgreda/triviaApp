import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { User } from '../shared/models/user.model';
import { CustomSevice } from '../shared/services/custom.service';

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

  constructor( public _customService:CustomSevice ) {
  }

  ngOnInit() {
  }

  registerForm():void{
    var tmpS = [];
    tmpS.push(this.user1);
    tmpS.push(this.user2);
    tmpS.push(this.user3);
    tmpS.push(this.user4);
    tmpS.push(this.user5);
    this.userRegister.users = tmpS;
    
    this._customService.register(this.userRegister).subscribe(
      response => {
        this.txtMessage = "Grupo:" + this.userRegister.teamName + "registrado correctamente";
        this.message = true;
      }, error => {
        this.txtMessage = "No es posible registrar el grupo, por favor valide si los datos ingresados son correctos";
        this.message = true;
        console.log(error);
      }
    );

  }

}