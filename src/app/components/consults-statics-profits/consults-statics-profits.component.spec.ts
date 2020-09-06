import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsStaticsProfitsComponent } from './consults-statics-profits.component';

describe('ConsultsStaticsProfitsComponent', () => {
  let component: ConsultsStaticsProfitsComponent;
  let fixture: ComponentFixture<ConsultsStaticsProfitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultsStaticsProfitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultsStaticsProfitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
