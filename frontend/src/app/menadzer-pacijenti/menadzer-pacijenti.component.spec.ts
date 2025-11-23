import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerPacijentiComponent } from './menadzer-pacijenti.component';

describe('MenadzerPacijentiComponent', () => {
  let component: MenadzerPacijentiComponent;
  let fixture: ComponentFixture<MenadzerPacijentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerPacijentiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerPacijentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
