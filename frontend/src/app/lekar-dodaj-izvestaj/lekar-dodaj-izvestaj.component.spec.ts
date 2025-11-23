import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarDodajIzvestajComponent } from './lekar-dodaj-izvestaj.component';

describe('LekarDodajIzvestajComponent', () => {
  let component: LekarDodajIzvestajComponent;
  let fixture: ComponentFixture<LekarDodajIzvestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarDodajIzvestajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarDodajIzvestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
