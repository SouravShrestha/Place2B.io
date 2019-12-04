import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  uploading = false;
  selectedFile: File;
  img_url: any;
  filename:any;

  constructor(private fb: FormBuilder, private _slidesService: SlidesService, private _router: Router) { 
  }

  ngOnInit() { 
    this.upload_form = this.fb.group({
      'title': ['',Validators.required],
      'description': ['',Validators.required],
      'tags': ['',Validators.required],
      'url': ['']
    });
  }

  get url(){
    return this.upload_form.get('url');
  }

  get title(){
    return this.upload_form.get('title');
  }

  get description(){
    return this.upload_form.get('description');
  }

  get tags(){
    return this.upload_form.get('tags');
  }

  async submitHandler(){
    this.slide_to_upload.title = this.upload_form.value.title;
    this.slide_to_upload.description = this.upload_form.value.description;
    var temp_tags = this.upload_form.value.tags;
    this.slide_to_upload.tags = temp_tags.split(";");
    this.slide_to_upload.author = "Sourav Shrestha";
    this.upload_form.disable();
    this.uploading = true;
    this._slidesService.upload_image(this.slide_to_upload);
  }

  async pickFile(file_img){
    this.selectedFile = file_img.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = async (_event) =>{
      this.img_url = reader.result;
      this.filename = this.selectedFile.name;
      await this._slidesService.save_image(file_img.target.files[0]);
    };
  }
}
