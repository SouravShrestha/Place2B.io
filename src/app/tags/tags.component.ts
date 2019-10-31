import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags_array_main:any;
  tags_array_temp:any;
  tag_name: string;
  temp;

  constructor() { 
    this.temp = Array(10).fill(4);
  }

  ngOnInit() {
    this.tags_array_main = [{name:'angular',color:'#DC0530',textColor:'#FFFFFF'},{name:'react',color:'#09C372',textColor:'#FFFFFF'},{name:'advanced',color:'#757575',textColor:'#FFFFFF'},{name:'firebase',color:'#FFCB2B',textColor:'#2a2a2a'},{name:'web',color:'#2A2E35',textColor:'#FFFFFF'},{name:'2ndmod',color:'#09C372',textColor:'#FFFFFF'},{name:'daily',color:'#E55523',textColor:'#FFFFFF'},{name:'java',color:'#669900',textColor:'#FFFFFF'},{name:'c',color:'#2A2E35',textColor:'#FFFFFF'},{name:'c++',color:'#757575',textColor:'#FFFFFF'},{name:'cloud-function',color:'#2775C3',textColor:'#FFFFFF'},{name:'python',color:'#2A2E35',textColor:'#FFFFFF'}];
    this.tags_array_temp = this.tags_array_main;
    this.tags_array_main.sort((a, b) => a.name > b.name ? 1 : -1);
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
