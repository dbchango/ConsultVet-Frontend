import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPetsComponent } from './client-pets.component';

describe('ClientPetsComponent', () => {
  let component: ClientPetsComponent;
  let fixture: ComponentFixture<ClientPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
