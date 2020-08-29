import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryConsultComponent } from './veterinary-consult.component';

describe('VeterinaryConsultComponent', () => {
  let component: VeterinaryConsultComponent;
  let fixture: ComponentFixture<VeterinaryConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
