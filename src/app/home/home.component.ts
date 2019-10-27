import { Component, ViewChild, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(NavBarComponent) nav_bar;
  src_land = "../../assets/images/landing-page-dark.svg";

  constructor() { 
  }

  ngOnInit() { 
    this.src_land = this.nav_bar.src_land;
  }
 
  src_land_change($event){
    this.src_land = $event;
  }

}
