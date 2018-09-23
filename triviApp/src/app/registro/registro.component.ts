import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { User } from '../shared/models/user.model';

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

  constructor() {
  }

  ngOnInit() {
  }

  private registerForm():void{
    var tmpS = [];
    tmpS.push(this.user1);
    tmpS.push(this.user2);
    
    this.userRegister.$users = tmpS;
    console.log(this.userRegister);
  }

}