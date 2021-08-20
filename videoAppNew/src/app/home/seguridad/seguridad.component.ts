import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html'
})

export class SeguridadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.showTB').click();
  }

}
