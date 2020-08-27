import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineMainComponent } from './medicine-main.component';

describe('MedicineMainComponent', () => {
  let component: MedicineMainComponent;
  let fixture: ComponentFixture<MedicineMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
