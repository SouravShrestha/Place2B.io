import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private land_src = new BehaviorSubject('../../assets/images/landing-page-dark.svg');
  curr_src = this.land_src.asObservable();

  constructor() { }

  changeLandSrc(src: string) {
    this.land_src.next(src);
  }

}
