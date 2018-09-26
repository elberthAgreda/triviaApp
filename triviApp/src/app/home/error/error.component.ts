import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalService } from '../../shared/services/local.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  private errors:any;
  private subscriptionError:ISubscription;

  constructor( private _localService:LocalService ) {
    this.subscriptionError = this._localService.questionError.subscribe(
      response => {
        this.errors = response;
        console.log(response);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionError.unsubscribe();
  }

}