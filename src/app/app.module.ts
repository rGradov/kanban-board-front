import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColumComponent } from './ui/component/colum/colum.component';
import { ItemComponent } from './ui/component/item/item.component';
import { TagComponent } from './ui/component/item/tag/tag.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AvatarstacksComponent } from './shared/avatarstacks/avatarstacks.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumComponent,
    ItemComponent,
    TagComponent,
    AlertComponent,
    AvatarstacksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
