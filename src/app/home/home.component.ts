import { Component, ViewChild, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  src_land:string;

  constructor(private data: DataService) { 
  }

  ngOnInit() { 
    this.data.curr_src.subscribe(src_land => this.src_land = src_land);
  }

}
