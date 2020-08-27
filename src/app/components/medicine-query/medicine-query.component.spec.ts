import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineQueryComponent } from './medicine-query.component';

describe('MedicineQueryComponent', () => {
  let component: MedicineQueryComponent;
  let fixture: ComponentFixture<MedicineQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
