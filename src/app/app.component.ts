import { Component } from '@angular/core';
import { fadeAnimation } from '../app/route-animations';

@Component({
  selector: 'app-root',
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Place2B';
}

