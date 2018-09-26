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

  private userRegister:Register = new Register();
  private user1:User = new User();
  private user2:User = new User();
  private user3:User = new User();
  private user4:User = new User();
  private user5:User = new User();

  constructor( private _customService:CustomSevice ) {
  }

  ngOnInit() {
  }

  private registerForm():void{
    var tmpS = [];
    tmpS.push(this.user1);
    tmpS.push(this.user2);
    tmpS.push(this.user3);
    tmpS.push(this.user4);
    tmpS.push(this.user5);
    //this.userRegister.$users = tmpS;
    console.log(tmpS);
    this._customService.register(this.userRegister).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    );

  }

}