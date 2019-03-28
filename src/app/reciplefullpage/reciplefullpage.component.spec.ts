import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciplefullpageComponent } from './reciplefullpage.component';

describe('ReciplefullpageComponent', () => {
  let component: ReciplefullpageComponent;
  let fixture: ComponentFixture<ReciplefullpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciplefullpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciplefullpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
