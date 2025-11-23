import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerLekariComponent } from './menadzer-lekari.component';

describe('MenadzerLekariComponent', () => {
  let component: MenadzerLekariComponent;
  let fixture: ComponentFixture<MenadzerLekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerLekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerLekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
