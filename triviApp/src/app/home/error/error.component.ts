import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../shared/services/local.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  private errors:any;

  constructor( private _localService:LocalService ) {
    // this._localService.questionError.subscribe(
    //   response => this.errors = response,
    //   error => this.errors = null
    // );
  }

  ngOnInit() {
  }

}
