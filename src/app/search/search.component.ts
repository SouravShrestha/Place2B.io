import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import 'rxjs/add/operator/debounceTime';
import { RandomBackFont } from "../random-back-font";
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
  keyword_temp: string;
  rbf = new RandomBackFont();
  random_colors: {_back:string, _font:string} = {'_back':'','_font':''};
  suggest: boolean = true;
  last_index = 0;
  key_pressed = false;
  arr = new Array(5);
  results: any[] = [];
  results_temp_users = [];
  results_temp_slides = [];
  curr_sugg = -1;
  tags: string[]=[];
  font: string[]=[];
  back: string[]=[];
  count_result = -1;
  searched_status = false;
  searchField: FormControl = new FormControl();
  search_result: boolean = true;

  ngOnInit() {
    this.searched_status = false;
    this.search_result = false;
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
            result.json().people.forEach(elem => {
              this.results.push(elem.name)
            });
            result.json().slides.forEach(elem => {
              this.results.push(elem.title)
            });
            if(this.results.length > 7)
              this.results = this.results.slice(0,8);
          }
        }
      });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (this.key_pressed)
      this.curr_sugg = this.last_index;
    this.key_pressed = false
  }

  getColor(name:string){
    if(!(this.tags.indexOf(name)>-1)){
      this.tags.push(name);
      this.rbf = new RandomBackFont();
      this.random_colors = this.rbf.get_colors();
      this.font.push(this.random_colors._font);
      this.back.push(this.random_colors._back);
    }
    var obj = {
      color: this.font[this.tags.indexOf(name)], back: this.back[this.tags.indexOf(name)]
    }
    return obj;
  }

  nextSugg(event) {
    this.key_pressed = true
    if (this.curr_sugg >= this.results.length - 1) this.curr_sugg = -1;
    else ++this.curr_sugg;
    console.log(this.curr_sugg)
  }

  mouseLeave() {
    this.results = []
  }

  mouseEnter(index) {
    this.last_index = index;
    if (!this.key_pressed)
      this.curr_sugg = index
  }

  prevSugg(event) {
    this.key_pressed = true
    if (this.curr_sugg < 0) this.curr_sugg = this.results.length - 1;
    else --this.curr_sugg;
  }

  onFocus() {
    this.key_pressed = false
    this.suggest = true;
    this.curr_sugg = -1;
  }

  leave_box() {
    this.curr_sugg = -1;
    this.key_pressed = false
    this.suggest = true;
  }

  close_sugg(event) {
    this.results = []
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

  getRes() {
    this.mouseLeave();
    this.searched_status = true; 
    this.results_temp_users = [];
    this.results_temp_slides = [];
    this._searchService.getSearchResults(this.keyword).subscribe(res => {
      this.count_result = 0;
      this.count_result = res.people.length + res.slides.length
      if (!(res.result == false)) {
        res.people.forEach(element => {
          var user = element.name.toLowerCase();
          var user_id = element._id.toLowerCase();
          this.results_temp_users.push({ name: user, id: user_id });
          console.log(user + " " + user_id);
        });
        res.slides.forEach(element => {
          var title = element.title;
          var slide_id = element._id;
          this.results_temp_slides.push({ title: title, _id: slide_id, description: element.description, tags: element.tags, url: element.url});
          console.log(title + " " + slide_id);
        });
      } else {  
        this.search_result = false;
      }
    });
  }

  search_() {
    this.suggest = false;
    this.search_result = true;
    document.getElementById("search-bar").blur();
    if ((this.keyword != null && this.curr_sugg == -1) || this.key_pressed == false) {
      this.getRes();
    }
    else {
      this.keyword = document.getElementsByClassName('active_sugg')[0].textContent
      this.curr_sugg = -1;
      this.suggest = false;
      document.getElementById("btn-search").focus();
      this.getRes();
    }
    this.keyword_temp = this.keyword;
  }

  btn_click() {
    this.keyword_temp = this.keyword;
    this.search_result = true;
    document.getElementById("search-bar").blur();
    this.getRes();
  }
}
