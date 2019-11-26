export class RandomBackFont{

    back_color = ["#1abc9c","#2ecc71","#e67e22","#3498db","#9b59b6","#c0392b","#8e44ad","#2c3e50","#ffffff"];

    font_color = ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#2a2a2a"];

    return_value: {_back:string, _font:string}={'_back':"","_font":""};

    constructor(){
        
    }

    get_colors(){
        var min=0; 
        var max=this.back_color.length;  
        var index = Math.floor(Math.random() * (+max - +min)) + +min;
        this.return_value._back = this.back_color[index];
        this.return_value._font = this.font_color[index];
        return this.return_value;
    }

}