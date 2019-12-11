import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _searchService: SearchService) { }
  keyword: string;

  ngOnInit() {
  }

  search_() {
    if (this.keyword != null) {
      this._searchService.getSearchResults(this.keyword).subscribe(res => {
        res.forEach(element => {
          var user = element.name.toLowerCase();
          var user_id = element._id.toLowerCase();
          console.log(user + " " + user_id);
        });
      });
    }
  }

}
