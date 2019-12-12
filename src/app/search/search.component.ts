import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _searchService: SearchService) { }
  keyword: string;
  suggest: boolean = true;
  last_index = 0;
  key_pressed = false;
  results: any[] = [];
  curr_sugg = -1;
  searchField: FormControl = new FormControl();

  ngOnInit() {
    this.searchField.valueChanges.
      debounceTime(200).distinctUntilChanged().
      switchMap((keyword) => this._searchService.getSuggestions(keyword)).
      subscribe(result => {
        if (result.status === 400) { return; }
        else if (this.suggest) {
          if (this.curr_sugg != -1)
            this.curr_sugg = -1;
          this.results = [];
          if (!(result.json().result == false)) {
            result.json().forEach(elem => {
              this.results.push(elem.name)
            });
          }
        }
      });
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    if(this.key_pressed)
      this.curr_sugg = this.last_index;
    this.key_pressed = false
  }

  nextSugg(event) {
    this.key_pressed = true
    if (this.curr_sugg >= this.results.length - 1) this.curr_sugg = -1;
    else ++this.curr_sugg;
    console.log(this.curr_sugg)
  }

  mouseLeave(){
    this.results = []
  }

  mouseEnter(index) {
    this.last_index = index;
    if (!this.key_pressed)
      this.curr_sugg = index
    console.log(this.curr_sugg)
  }

  prevSugg(event) {
    this.key_pressed = true
    if (this.curr_sugg < 0) this.curr_sugg = this.results.length - 1;
    else --this.curr_sugg;
    console.log(this.curr_sugg)
  }

  onFocus() {
    this.key_pressed = false
    this.suggest = true;
    this.curr_sugg = -1;
  }

  set_input(event) {
    this.suggest = false;
    var target = event.target || event.srcElement || event.currentTarget;
    var value = target.innerText;
    this.curr_sugg = -1;
    document.getElementById("btn-search").focus();
    this.keyword = value;
    this.results = [];
    this.search_();
  }

  getRes(){
    this._searchService.getSearchResults(this.keyword).subscribe(res => {
      res.forEach(element => {
        var user = element.name.toLowerCase();
        var user_id = element._id.toLowerCase();
        console.log(user + " " + user_id);
      });
    });
  }

  search_() {
    this.suggest = false;
    document.getElementById("search-bar").blur();
    if ((this.keyword != null && this.curr_sugg == -1) || this.key_pressed == false) {
      this.results = []
      this.getRes();
    }
    else {
      this.keyword = document.getElementsByClassName('active_sugg')[0].textContent
      this.results = []
      this.curr_sugg = -1;
      this.suggest = false;
      document.getElementById("btn-search").focus();
      this.getRes();
    }
  }

  btn_click(){
    document.getElementById("search-bar").blur();
    this.results = [];
    this.getRes();
  }
}
