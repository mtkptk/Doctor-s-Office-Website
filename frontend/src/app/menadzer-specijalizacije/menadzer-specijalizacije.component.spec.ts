import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerSpecijalizacijeComponent } from './menadzer-specijalizacije.component';

describe('MenadzerSpecijalizacijeComponent', () => {
  let component: MenadzerSpecijalizacijeComponent;
  let fixture: ComponentFixture<MenadzerSpecijalizacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerSpecijalizacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerSpecijalizacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
