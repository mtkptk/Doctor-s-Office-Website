import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerRegistracijeComponent } from './menadzer-registracije.component';

describe('MenadzerRegistracijeComponent', () => {
  let component: MenadzerRegistracijeComponent;
  let fixture: ComponentFixture<MenadzerRegistracijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerRegistracijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerRegistracijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
