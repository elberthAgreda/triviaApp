import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-riesgos',
  templateUrl: './riesgos.component.html'
})

export class RiesgosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.showTB').click();
  }

}
