import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryFormComponent } from './veterinary-form.component';

describe('VeterinaryFormComponent', () => {
  let component: VeterinaryFormComponent;
  let fixture: ComponentFixture<VeterinaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
