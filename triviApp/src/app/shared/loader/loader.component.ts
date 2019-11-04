import { Component, Input } from '@angular/core';

@Component({
 selector: 'loader',
 templateUrl: './loader.html',
 styleUrls: ['./loader.scss']
})
export class LoaderComponent {

 @Input() estado: string;

 constructor() { }


}
