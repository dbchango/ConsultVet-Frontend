import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryInfoComponent } from './veterinary-info.component';

describe('VeterinaryInfoComponent', () => {
  let component: VeterinaryInfoComponent;
  let fixture: ComponentFixture<VeterinaryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
