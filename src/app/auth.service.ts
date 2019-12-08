import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DataService } from "./data.service";
import { Router } from "@angular/router"; 
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private _http: Http, private _router: Router, private data: DataService, @Inject(DOCUMENT) private document: Document) { }
  registerUser(user){
    this._http.post("/api/signup", user).subscribe(
      (res) => {
        this.data.changeFormStatus(1);
        this.document.getElementById('right-column').style.transform = "translateX(0%)";
        this.document.getElementById('left-column').style.transform = "translateX(0%)";
      },
      (err) => console.log(err)
    );
  }

  loginUser(user) {
    return this._http.post("/api/login", user).subscribe(
      (res) => {
        localStorage.setItem('token', res.json().token);
        localStorage.setItem('user', res.json().user);
        this.data.changeModalStatus(false);
        this.document.getElementById("body-main").style.position = '';
        this.document.getElementById("upload").style.display = '';
        this.document.getElementById("settings").style.width = '';
        this.document.getElementById("brightness").style.width = '';
        this.document.getElementById("body-main").style.top = '';
        if (this.document.getElementById("temp-ref-main"))
          this.document.getElementById("temp-ref-main").style.marginRight = '0px';
        window.scrollTo(0, scrollY * -1);
            this._router.navigateByUrl('/profile');
      },
      (err) => console.log(err)
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
