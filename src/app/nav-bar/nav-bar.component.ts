import { Component, OnInit, HostListener, Inject, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  light_status:string = 'Lights On';
  hover_on_settings = true;
  normal_pos = true;
  img_src = '../../assets/images/set-light.svg';
  src_land = '../../assets/images/landing-page-dark.svg';

  @Output() src_land_event = new EventEmitter<string>();

  constructor( @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    if(offset > 200){
      document.getElementById("settings").style.top = "-40px";
      this.normal_pos = false;
    }
    else{
      this.normal_pos = true;
    }
    if(offset < 100){
      document.getElementById("settings").style.top = "3%";
    }
  }

  toggle_hover_on_settings(){
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if(this.hover_on_settings == true){
      if(offset > 200){
        document.getElementById("settings").style.top = "0%";
      }else{
        document.getElementById("settings").style.top = "3%";
      }
    }else if(offset > 200){
      document.getElementById("settings").style.top = "-40px";
    }
    this.hover_on_settings = !this.hover_on_settings;
  }

  changeTheme(){
    if(this.light_status == 'Lights On'){
      this.light_status = 'Lights Off';
    }else{
      this.light_status = 'Lights On';
    }
    document.getElementById("brightness").setAttribute('title-tooltip',this.light_status);
    var currTheme = document.documentElement.getAttribute('data-theme');
    if(currTheme == 'dark'){
      document.documentElement.setAttribute('data-theme','light');
      this.src_land = '../../assets/images/landing-page-light.svg';
      this.img_src = '../../assets/images/set-dark.svg';
    }else{
      document.documentElement.setAttribute('data-theme','dark');
      this.src_land = '../../assets/images/landing-page-dark.svg';
      this.img_src = '../../assets/images/set-light.svg';
    }
    this.src_land_event.emit(this.src_land);
  }

}
