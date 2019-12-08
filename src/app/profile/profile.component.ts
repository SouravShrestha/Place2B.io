import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = new User();

  constructor(private router: Router) { }

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logOut(){
    console.log("Logout")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl('/');
  }

}
