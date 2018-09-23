import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  
  private urlIframe:SafeResourceUrl;
  private parentRouteId:any;

  constructor( private _router:Router, private sanitizer:DomSanitizer ) {
    this.parentRouteId = "http://unoraya.com/";
    this.urlIframe = this.sanitizer.bypassSecurityTrustResourceUrl(this.parentRouteId);
  }

  ngOnInit() {
  }

  private navigate(path:string):void{
    this._router.navigate([path]);
  }

}