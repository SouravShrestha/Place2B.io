import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Slide } from './slide';
import { Router } from "@angular/router"; 

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  result:any;
  temp:any;
  img_url: any;
  fd = new FormData();

  constructor(private _http: Http, private _router: Router) { 
  }

  getRecentSlides(){
    return this._http.get("/api/recentSlides").pipe(map(result => this.result = result.json()));
  }

  getTags(){
    return this._http.get("/api/tags").pipe(map(result => this.temp = result.json()));
  }

  async uploadSlide(slide: Slide){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/api/upload', JSON.stringify(slide), options).subscribe(
      res => this._router.navigateByUrl('/')
  )}

  save_image(image: File){
    var fd = new FormData();
    fd.append('slide-image',image);
    return this._http.post('/api/save_image', fd).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  async upload_image(slide_to_upload: Slide){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/api/image_upload', options).subscribe(
      async res=>{
        slide_to_upload.url = await res.json().link;
        // console.log(slide_to_upload.url);
        this.uploadSlide(slide_to_upload);
      }
    );
  }
  
}
