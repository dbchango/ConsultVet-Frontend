import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultMainComponent } from './consult-main.component';

describe('ConsultMainComponent', () => {
  let component: ConsultMainComponent;
  let fixture: ComponentFixture<ConsultMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
