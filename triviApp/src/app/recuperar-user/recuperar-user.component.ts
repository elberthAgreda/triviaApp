import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSevice } from '../shared/services/custom.service';

@Component({
  selector: 'app-reset-user',
  templateUrl: './recuperar.user.html',
  styleUrls: ['../login/login.component.css']
})
export class RecuperarUserComponent implements OnInit {

  identifier: string;
  loader: boolean;
  stateMessage: boolean;
  message: string;

  constructor( private _customService: CustomSevice,
                private _router: Router ) { }

  ngOnInit() { }

  getUserName() {
    this._customService.getUserName(this.identifier).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
