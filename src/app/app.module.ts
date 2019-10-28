import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SlideCardComponent } from './slide-card/slide-card.component';
import { OwlModule } from 'ngx-owl-carousel';
import { FooterComponent } from './footer/footer.component';
import { SlideFollowingComponent } from './slide-following/slide-following.component';
import { UploadComponent } from './upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SlideCardComponent,
    FooterComponent,
    SlideFollowingComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    BrowserAnimationsModule,
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
