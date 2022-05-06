import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BitcoinService } from './bitcoin.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClient],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [BitcoinService],
})
export class AppModule {}
