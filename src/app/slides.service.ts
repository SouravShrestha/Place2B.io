import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  result:any;
  temp:any;

  constructor(private _http: Http) { 
  }

  getRecentSlides(){
    return this._http.get("/api/recentSlides").pipe(map(result => this.result = result.json()));
  }

  getTags(){
    return this._http.get("/api/tags").pipe(map(result => this.temp = result.json()));
  }
}
