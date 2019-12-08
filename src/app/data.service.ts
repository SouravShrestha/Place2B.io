import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private land_src = new BehaviorSubject('../../assets/images/back.svg');
  curr_src = this.land_src.asObservable();

  private modal_status = new BehaviorSubject(false);
  curr_modal_status = this.modal_status.asObservable();

  private form_status = new BehaviorSubject(1);
  curr_form_status = this.form_status.asObservable();

  constructor() { }

  changeLandSrc(src: string) {
    this.land_src.next(src);
  }

  changeModalStatus(status: boolean) {
    this.modal_status.next(status);
  }

  changeFormStatus(status: number) {
    this.form_status.next(status);
  }


}
