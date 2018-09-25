<<<<<<< Updated upstream
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalService } from '../../shared/services/local.service';
import { ISubscription } from 'rxjs/Subscription';
=======
import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../shared/services/local.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  private errors:any;
<<<<<<< Updated upstream
  private subscriptionError:ISubscription;

  constructor( private _localService:LocalService ) {
    this.subscriptionError = this._localService.questionError.subscribe(
      response => {
        this.errors = response;
        console.log(response);
      }
    );
=======

  constructor( private _localService:LocalService ) {
    // this._localService.questionError.subscribe(
    //   response => this.errors = response,
    //   error => this.errors = null
    // );
>>>>>>> Stashed changes
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionError.unsubscribe();
  }

}