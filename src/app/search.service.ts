import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router"; 

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  temp:any;

  constructor(private _http: Http, private _router: Router) { }

  getSearchResults(keyword: string){
    return this._http.get("/api/search?keyword="+keyword).pipe(map(result => this.temp = result.json()));
  }

}
