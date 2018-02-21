import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './components/fixed/header/header.component';
import { FooterComponent } from './components/fixed/footer/footer.component';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [AppComponent,HeaderComponent,FooterComponent],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
