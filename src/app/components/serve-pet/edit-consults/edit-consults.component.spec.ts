import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsultsComponent } from './edit-consults.component';

describe('EditConsultsComponent', () => {
  let component: EditConsultsComponent;
  let fixture: ComponentFixture<EditConsultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConsultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
