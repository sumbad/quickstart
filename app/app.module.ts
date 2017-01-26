import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PopoverComponent } from './popover/popover.component';
import { AppService } from './app.service';


@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [
    AppComponent,
    PopoverComponent
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
