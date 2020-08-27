import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInfoComponent } from './consult-info.component';

describe('ConsultInfoComponent', () => {
  let component: ConsultInfoComponent;
  let fixture: ComponentFixture<ConsultInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
