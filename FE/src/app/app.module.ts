import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuideComponent } from './guide/guide.component';
import { GuideModalComponent } from './guide-modal/guide-modal.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    // GuideComponent,
    // HeaderComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
