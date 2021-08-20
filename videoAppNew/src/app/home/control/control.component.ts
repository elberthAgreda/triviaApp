import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.showTB').click();
  }

}
