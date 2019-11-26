export class Slide {
    _id: String;
    title: String;
    description: String;
    tags: [{
        name:String,
        bg:String,
        text_color:String
    }];
    date: Date;
    author: String;
}
