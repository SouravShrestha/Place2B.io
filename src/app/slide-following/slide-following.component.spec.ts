import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideFollowingComponent } from './slide-following.component';

describe('SlideFollowingComponent', () => {
  let component: SlideFollowingComponent;
  let fixture: ComponentFixture<SlideFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
