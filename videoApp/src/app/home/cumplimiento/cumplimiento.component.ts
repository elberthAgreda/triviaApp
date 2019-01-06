import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cumplimiento',
  templateUrl: './cumplimiento.component.html'
})
export class CumplimientoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.collapsible').collapsible();
    $('.showTB').click();
  }

}
