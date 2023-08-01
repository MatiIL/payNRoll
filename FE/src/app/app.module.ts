import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { AuthComponent } from './auth/auth-modal.component';
import { AuthFormComponent } from './auth/auth-form/auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    TableComponent,
    AuthComponent,
    AuthFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
