export class RandomBackFont{

    back_color = [
        "#C91F37","#5D3F6A","#4D8FAC","#22A7F0","#1F4788","#8DB255","#16A085","#E2B13C","#F9690E","#757D75","#26C281","#264348","#F62459","#F58F84","#F47983","#19B5FE","#ABB7B7","#89C4F4"
    ];

    font_color = ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#2a2a2a","#2a2a2a"];

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