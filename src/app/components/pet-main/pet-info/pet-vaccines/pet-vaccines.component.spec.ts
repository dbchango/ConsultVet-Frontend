import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetVaccinesComponent } from './pet-vaccines.component';

describe('PetVaccinesComponent', () => {
  let component: PetVaccinesComponent;
  let fixture: ComponentFixture<PetVaccinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetVaccinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
