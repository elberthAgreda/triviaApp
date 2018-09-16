import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor( private _router:Router ) { }

  ngOnInit() {
  }

  private navigate(path:string):void{
    this._router.navigate([path]);
  }

}
