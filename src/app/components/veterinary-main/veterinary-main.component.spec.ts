import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryMainComponent } from './veterinary-main.component';

describe('VeterinaryMainComponent', () => {
  let component: VeterinaryMainComponent;
  let fixture: ComponentFixture<VeterinaryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
