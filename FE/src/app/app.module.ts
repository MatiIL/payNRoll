import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { AuthModalComponent } from './auth/auth-modal/auth-modal.component';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TeamNameModule } from './auth/team-name/team-name.module';
import { KeepersFormModule } from './keepers-form/keepers-form.module';
import { QuickGuideModule } from './quick-guide/quick-guide.module'
import { UserService } from './services/user-service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('Authentication'); 
        },
        allowedDomains: ['http://localhost:9000/', 'https://paynroll-server.onrender.com/'], 
      },
    }),
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserAnimationsModule,
    TableComponent,
    AuthModalComponent,
    AuthFormComponent,
    TeamNameModule,
    GraphQLModule,
    HttpClientModule,
    KeepersFormModule,
    QuickGuideModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
