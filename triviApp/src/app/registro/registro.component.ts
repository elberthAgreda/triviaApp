import { Component, OnInit } from '@angular/core';
import { Register } from '../shared/models/register.model';
import { User } from '../shared/models/user.model';
<<<<<<< Updated upstream
import { CustomSevice } from '../shared/services/custom.service';
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  constructor( private _customService:CustomSevice ) {
=======
  constructor() {
>>>>>>> Stashed changes
  }

  ngOnInit() {
  }

  private registerForm():void{
    var tmpS = [];
    tmpS.push(this.user1);
    tmpS.push(this.user2);
<<<<<<< Updated upstream
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

=======
    
    this.userRegister.$users = tmpS;
    console.log(this.userRegister);
>>>>>>> Stashed changes
  }

}