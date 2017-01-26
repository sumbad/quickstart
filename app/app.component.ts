import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import { AppService } from './app.service';
import { IPosition } from './popover/IPosition';



@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent implements OnInit {
  pricelist: any;
  overedPrice: {};
  positionPopover: IPosition;


  constructor(private appService: AppService, private el: ElementRef) { }


  ngOnInit() {
    this.appService.getPriceList().subscribe(d => {
      this.pricelist = d.pricelist;
    });
  }


  openPopover(e: any, price: {}) {
    this.overedPrice = price;
    let rect = e.target.getBoundingClientRect();

    this.positionPopover = {
      left: rect.left + window.scrollX,
      top: rect.bottom + window.scrollY,
      bottom: rect.top + window.scrollY,
      right: rect.right + window.scrollX
    };
  }


  closePopover(e: any) {
    this.positionPopover = null;
  }

}
