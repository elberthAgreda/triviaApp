import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-sarlaft',
  templateUrl: './sarlaft.component.html'
})
export class SarlaftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.showTB').click();
  }

}
