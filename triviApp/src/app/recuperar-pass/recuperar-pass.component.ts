import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../shared/services/custom.service';
import { UserData } from '../shared/models/userData.model';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar-pass.html',
  styleUrls: ['../login/login.component.css']
})

export class RecuperarPassComponent implements OnInit {
    userData: UserData = new UserData();
    showRecuperar: boolean;
    stateMessage: boolean;
    password2: string;
    message: string;
    loader: boolean;

    constructor( private _customService: CustomSevice,
                 private _router: Router ) {
        this.showRecuperar = false;
        this.stateMessage = false;
    }

    ngOnInit() { }

    validarUser() {
      this.loader = true;
      this.stateMessage = false;
      this._customService.validarUsuarioGrupo<any>(this.userData).subscribe(
        response => {
          if ( response.exito ) {
            this.showRecuperar = true;
          } else {
            this.showRecuperar = false;
          }
          this.loader = false;
        }, error => {
          this.message = error.error.message;
          this.stateMessage = true;
          this.loader = false;
        }
      );
    }

    change() {
      this.stateMessage = false;
      this.loader = true;
      if ( this.userData.password !== this.password2 ) {
        this.message = 'Las contraseñas no coinciden';
        this.stateMessage = true;
        this.loader = false;
        return;
      }
      this._customService.change<any>(this.userData).subscribe(
        response => {
          this.loader = false;
          this._router.navigate(['login']);
        }
      );
    }

}
