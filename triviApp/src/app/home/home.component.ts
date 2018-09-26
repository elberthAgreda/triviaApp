import { Component, OnInit } from '@angular/core';
import { CustomSevice } from '../shared/services/custom.service';

@Component({
  selector: 'trivia-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  
  constructor( private _customService:CustomSevice ){}

  ngOnInit() {}

}
