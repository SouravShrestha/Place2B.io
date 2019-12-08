import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SlideCardComponent } from './slide-card/slide-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FooterComponent } from './footer/footer.component';
import { SlideFollowingComponent } from './slide-following/slide-following.component';
import { UploadComponent } from './upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';
import { HttpModule } from '@angular/http';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SlideCardComponent,
    FooterComponent,
    SlideFollowingComponent,
    UploadComponent,
    SearchComponent,
    TagsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
