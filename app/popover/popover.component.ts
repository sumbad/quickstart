import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { IPosition } from './IPosition';
import { DomSanitizer } from '@angular/platform-browser'



@Component({
    moduleId: module.id,
    selector: 'popover',
    templateUrl: 'popover.component.html',
    styleUrls: ['popover.component.css']
})
export class PopoverComponent {
    private _position: IPosition;
    _isHidden: boolean = false;
    private _price: any;
    private _priceDescriptionInnerHtml: any;
    private _priceName: any;
    private _popoverClassPlacement = 'popover-placement-bottomLeft';


    constructor(private sanitized: DomSanitizer, private cdRef: ChangeDetectorRef) {

    }


    @ViewChild('popoverDiv') popoverDiv: ElementRef;


    @Input()
    set position(position: IPosition) {
        this._position = position || {};
        this._isHidden = !position ? true : false;
    }


    @Input()
    set price(price: any) {
        this._price = price || {};

        if (this._price.description_ru && this._price.description_ru.length > 0) {
            this._priceDescriptionInnerHtml = this.sanitized.bypassSecurityTrustHtml(this._price.description_ru);
        } else {
            this._priceDescriptionInnerHtml = this.sanitized.bypassSecurityTrustHtml(this._price.description);
        }

        if (this._price.name_ru && this._price.name.length > 0) {
            this._priceName = this._price.name_ru;
        } else {
            this._priceName = this._price.name;
        }
    }


    ngAfterViewChecked() {
        if (this._position.top) {
            if (this.popoverDiv.nativeElement.getBoundingClientRect().bottom > window.innerHeight) {
                this._position.top = this._position.top
                    - (this.popoverDiv.nativeElement.getBoundingClientRect().bottom - this.popoverDiv.nativeElement.getBoundingClientRect().top)
                    - (this._position.top - this._position.bottom) - 10;
                this._popoverClassPlacement = 'popover-placement-topLeft';
            } else {
                this._popoverClassPlacement = 'popover-placement-bottomLeft';
            }
            this.cdRef.detectChanges();
        }
    }

}