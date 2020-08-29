import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServePetComponent } from './serve-pet.component';

describe('ServePetComponent', () => {
  let component: ServePetComponent;
  let fixture: ComponentFixture<ServePetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServePetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
