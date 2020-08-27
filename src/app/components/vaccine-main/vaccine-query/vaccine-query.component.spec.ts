import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineQueryComponent } from './vaccine-query.component';

describe('VaccineQueryComponent', () => {
  let component: VaccineQueryComponent;
  let fixture: ComponentFixture<VaccineQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
