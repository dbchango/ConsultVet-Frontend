import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineMainComponent } from './vaccine-main.component';

describe('VaccineMainComponent', () => {
  let component: VaccineMainComponent;
  let fixture: ComponentFixture<VaccineMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
