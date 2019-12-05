import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { DataService } from "../data.service";
import { Router } from '@angular/router';
import { trigger, transition, animate, style, state} from '@angular/animations'

@Component({
  selector: 'app-nav-bar',
  animations: [
    trigger(
      'inOutAnimation', 
      [ transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.5s ease-out', style({opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in', style({opacity: 0 }))
          ]
        )
      ]
    )
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  light_status:string = 'Lights On';
  toggle_button_text = 'SIGN UP';
  _heading = 'Hello, Friend!';
  _para = 'Enter your personal details and start journey with us';
  curr_status = 1; // login
  click_profile = false;
  hover_on_settings = true;
  normal_pos = true;
  img_src = '../../assets/images/set-light.svg';
  src_land:string;

  constructor(@Inject(DOCUMENT) private document: Document, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.curr_src.subscribe(src_land => this.src_land = src_land);
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
      this.img_src = '../../assets/images/set-dark.svg';
      this.data.changeLandSrc('../../assets/images/back.svg');
    }else{
      document.documentElement.setAttribute('data-theme','dark');
      this.img_src = '../../assets/images/set-light.svg';
      this.data.changeLandSrc('../../assets/images/back.svg');
    }
  }

  clicked_profile(){
    this.curr_status = 1;
    this.click_profile = true;
    const scrollY = this.document.documentElement.scrollTop;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    this.document.getElementById("body-main").style.position = 'fixed';
    this.document.getElementById("upload").style.display = 'none';
    this.document.getElementById("settings").style.width = '6%';
    this.document.getElementById("brightness").style.width = '100%';
    if(this.document.getElementById("temp-ref-main"))
      this.document.getElementById("temp-ref-main").style.marginRight = sbw+'px';
    this.document.getElementById("body-main").style.top = '-'+scrollY+'px';
  }

  close_modal(){
    const scrollY:number = this.document.getElementById("body-main").offsetTop;
    this.document.getElementById("body-main").style.position = '';
    this.document.getElementById("upload").style.display = '';
    this.document.getElementById("settings").style.width = '';
    this.document.getElementById("brightness").style.width = '';
    this.document.getElementById("body-main").style.top = '';
    if(this.document.getElementById("temp-ref-main"))
      this.document.getElementById("temp-ref-main").style.marginRight = '0px';
    window.scrollTo(0, scrollY * -1);
    this.click_profile = false;
    console.log(this.click_profile);
  }

  toggle_modal_view(){
    if(this.curr_status == 1){ //login
      this.curr_status = 0;
      this.document.getElementById('right-column').style.transform = "translateX(-100%)";
      this.document.getElementById('left-column').style.transform = "translateX(+100%)";
    }else{ //sign up
      this.curr_status = 1;
      this.document.getElementById('right-column').style.transform = "translateX(0%)";
      this.document.getElementById('left-column').style.transform = "translateX(0%)";
    }
  }

}
