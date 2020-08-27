import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryListComponent } from './veterinary-list.component';

describe('VeterinaryListComponent', () => {
  let component: VeterinaryListComponent;
  let fixture: ComponentFixture<VeterinaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
