import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalService } from '../../shared/services/local.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  errors:any;
  loader: boolean;
  subscriptionError:ISubscription;

  constructor( public _localService:LocalService ) {
    this.loader = true;
    this.subscriptionError = this._localService.questionError.subscribe(
      response => { this.errors = response; }
    );
  }

  ngOnInit() {
    this.loader = false;
  }

  ngOnDestroy() {
    this.subscriptionError.unsubscribe();
  }

}