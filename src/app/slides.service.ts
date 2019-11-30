import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Slide } from './slide';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  result:any;
  temp:any;
  fd = new FormData();

  constructor(private _http: Http) { 
  }

  getRecentSlides(){
    return this._http.get("/api/recentSlides").pipe(map(result => this.result = result.json()));
  }

  getTags(){
    return this._http.get("/api/tags").pipe(map(result => this.temp = result.json()));
  }

  uploadSlide(slide: Slide){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post('/api/upload', JSON.stringify(slide), options).subscribe(
      res=>console.log(res)
    );
  }
  
}
