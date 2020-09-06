import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsStaticsComponent } from './consults-statics.component';

describe('ConsultsStaticsComponent', () => {
  let component: ConsultsStaticsComponent;
  let fixture: ComponentFixture<ConsultsStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultsStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultsStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
