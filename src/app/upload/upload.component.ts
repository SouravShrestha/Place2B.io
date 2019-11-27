import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SlidesService } from "../slides.service";
import { Slide } from "../slide";
import { Router } from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  upload_form: FormGroup;
  slide_to_upload = new Slide();

  constructor(private fb: FormBuilder, private _slidesService: SlidesService, private _router: Router) { 
  }

  ngOnInit() { 
    this.upload_form = this.fb.group({
      'title': '',
      'description': '',
      'tags': '',
    });
  }

  submitHandler(){
    this.slide_to_upload.title = this.upload_form.value.title;
    this.slide_to_upload.description = this.upload_form.value.description;
    var temp_tags = this.upload_form.value.tags;
    this.slide_to_upload.tags = temp_tags.split(";");
    this.slide_to_upload.author = "Sourav Shrestha";
    this.slide_to_upload.url = "https://slidesgo.com/storage/35893/0RsLCjvTdDfz7YiCkGUeKmbw-63msl6yCs63CFHOX0sSaD3hYBm48CfCTivXyOt1GGH7hKnXKpL57xTGFWujJHvTtzd6nhavd79f2EIqs-irMFfImLHV_YL6dJ254WHjx6egvsDi0hJeopbeCfiEGRE5u9i3MT3kAEWgiIyAFMhCwVPS0Spli6YA2Kw2vtKcUC4uPA%3Ds1600.png";
    this._slidesService.uploadSlide(this.slide_to_upload);
    this._router.navigateByUrl('/');
  }

}
