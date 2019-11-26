import { Component, OnInit } from '@angular/core';
import { SlidesService } from "../slides.service";
import { Tag } from "./tag";
import { RandomBackFont } from "../random-back-font";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags_array_main: Tag[] =[];
  rbf = new RandomBackFont();
  tags_array_temp:any;
  tag_name: string;
  random_colors: {_back:string, _font:string} = {'_back':'','_font':''};
  tags:any;

  constructor(private _slidesService: SlidesService) { 
  }

  ngOnInit() {
    this._slidesService.getTags().subscribe(res => {
      res.forEach(element => {
        var tag = element._id.toLowerCase();
        this.rbf = new RandomBackFont();
        this.random_colors = this.rbf.get_colors();
        var font_color = this.random_colors._font;
        var back_color = this.random_colors._back;
        var obj = {
          name: tag, color: font_color, back: back_color
        }
        if(!(this.tags_array_main.find(res => res.name == tag))){
          this.tags_array_main.push(obj);
        }
        this.tags_array_temp = this.tags_array_main;
        this.tags_array_main.sort((a, b) => a.name > b.name ? 1 : -1);
      });
    });
  }

  setFocus(){
    document.getElementById("inp-search").focus();
  }

  search(){
    if(this.tag_name != ""){
      this.tags_array_temp = this.tags_array_main.filter(res => {
        return res.name.toLowerCase().indexOf(this.tag_name.replace("#","").toLowerCase()) == 0 || res.name.toLowerCase().includes("-"+this.tag_name.replace("#","").toLowerCase());
      });
      if(this.tags_array_temp == ""){
        document.getElementById("no-tags").setAttribute("class","no-tags-show");
      }else{
        document.getElementById("no-tags").setAttribute("class","no-tags-hide");
      }
    }else if(this.tag_name == ""){
      this.ngOnInit();
      document.getElementById("no-tags").setAttribute("class","no-tags-hide");
    }
  }

}
