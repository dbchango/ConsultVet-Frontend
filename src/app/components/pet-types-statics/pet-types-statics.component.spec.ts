import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTypesStaticsComponent } from './pet-types-statics.component';

describe('PetTypesStaticsComponent', () => {
  let component: PetTypesStaticsComponent;
  let fixture: ComponentFixture<PetTypesStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetTypesStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetTypesStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
