import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { DataService } from "../data.service";
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from "../user";
import { trigger, transition, animate, style, state } from '@angular/animations'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  animations: [
    trigger(
      'inOutAnimation',
      [transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('0.5s ease-out', style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('0.5s ease-in', style({ opacity: 0 }))
        ]
      )
      ]
    )
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  light_status: string = 'Lights On';
  toggle_button_text = 'SIGN UP';
  sign_up_form: FormGroup;
  login_form: FormGroup;
  _heading = 'Hello, Friend!';
  register_user = new User();
  login_user = new User();
  _para = 'Enter your personal details and start journey with us';
  curr_status = 1; // login
  click_profile = false;
  hover_on_settings = true;
  normal_pos = true;
  img_src = '../../assets/images/set-light.svg';
  src_land: string;

  constructor(private fb: FormBuilder, @Inject(DOCUMENT) private document: Document, private data: DataService, private _profileService: ProfileService, private router: Router, private _auth: AuthService) {
  }

  ngOnInit() {
    this.data.curr_src.subscribe(src_land => this.src_land = src_land);
    this.data.curr_form_status.subscribe(curr_form_status => this.curr_status = curr_form_status);
    this.data.curr_modal_status.subscribe(curr_modal_status => this.click_profile = curr_modal_status);
    this.sign_up_form = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'contact_number': ['', Validators.required],
      'gender': ['male']
    });
    this.login_form = this.fb.group({
      'login_email': ['', Validators.required],
      'login_password': ['', Validators.required]
    });
  }

  get login_name() {
    return this.sign_up_form.get('login_name');
  }

  get login_password() {
    return this.sign_up_form.get('login_password');
  }

  get name() {
    return this.sign_up_form.get('name');
  }

  get password() {
    return this.sign_up_form.get('password');
  }

  get gender() {
    return this.sign_up_form.get('gender');
  }

  get email() {
    return this.sign_up_form.get('email');
  }

  get contact_number() {
    return this.sign_up_form.get('contact_number');
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    if (offset > 200) {
      document.getElementById("settings").style.top = "-40px";
      this.normal_pos = false;
    }
    else {
      this.normal_pos = true;
    }
    if (offset < 100) {
      document.getElementById("settings").style.top = "3%";
    }
  }

  toggle_hover_on_settings() {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (this.hover_on_settings == true) {
      if (offset > 200) {
        document.getElementById("settings").style.top = "0%";
      } else {
        document.getElementById("settings").style.top = "3%";
      }
    } else if (offset > 200) {
      document.getElementById("settings").style.top = "-40px";
    }
    this.hover_on_settings = !this.hover_on_settings;
  }

  changeTheme() {
    if (this.light_status == 'Lights On') {
      this.light_status = 'Lights Off';
    } else {
      this.light_status = 'Lights On';
    }
    document.getElementById("brightness").setAttribute('title-tooltip', this.light_status);
    var currTheme = document.documentElement.getAttribute('data-theme');
    if (currTheme == 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      this.img_src = '../../assets/images/set-dark.svg';
      this.data.changeLandSrc('../../assets/images/back.svg');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.img_src = '../../assets/images/set-light.svg';
      this.data.changeLandSrc('../../assets/images/back.svg');
    }
  }

  clicked_profile() {
    this._profileService.getProfile().subscribe(
      res => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.curr_status = 1;
            this.click_profile = true;
            const scrollY = this.document.documentElement.scrollTop;
            const sbw = window.innerWidth - document.documentElement.clientWidth;
            this.document.getElementById("body-main").style.position = 'fixed';
            this.document.getElementById("upload").style.display = 'none';
            this.document.getElementById("settings").style.width = '6%';
            this.document.getElementById("brightness").style.width = '100%';
            if (this.document.getElementById("temp-ref-main"))
              this.document.getElementById("temp-ref-main").style.marginRight = sbw + 'px';
            this.document.getElementById("body-main").style.top = '-' + scrollY + 'px';
          }
        }
      }
    );
  }

  close_modal() {
    const scrollY: number = this.document.getElementById("body-main").offsetTop;
    this.document.getElementById("body-main").style.position = '';
    this.document.getElementById("upload").style.display = '';
    this.document.getElementById("settings").style.width = '';
    this.document.getElementById("brightness").style.width = '';
    this.document.getElementById("body-main").style.top = '';
    if (this.document.getElementById("temp-ref-main"))
      this.document.getElementById("temp-ref-main").style.marginRight = '0px';
    window.scrollTo(0, scrollY * -1);
    this.click_profile = false;
    //console.log(this.click_profile);
  }

  toggle_modal_view() {
    if (this.curr_status == 1) { //login
      this.data.changeFormStatus(0);
      this.document.getElementById('right-column').style.transform = "translateX(-100%)";
      this.document.getElementById('left-column').style.transform = "translateX(+100%)";
    } else { //sign up
      this.data.changeFormStatus(1);
      this.document.getElementById('right-column').style.transform = "translateX(0%)";
      this.document.getElementById('left-column').style.transform = "translateX(0%)";
    }
  }

  signUp() {
    this.register_user.name = this.sign_up_form.value.name;
    this.register_user.password = this.sign_up_form.value.password;
    this.register_user.email = this.sign_up_form.value.email;
    this.register_user.contact_number = this.sign_up_form.value.contact_number;
    this.register_user.gender = this.sign_up_form.value.gender;
    // console.log(this.register_user);
    this._auth.registerUser(this.register_user);
  }

  login() {
    this.login_user.email = this.login_form.value.login_email;
    this.login_user.password = this.login_form.value.login_password;
    // console.log(this.login_user);
    this._auth.loginUser(this.login_user);
  }


}
