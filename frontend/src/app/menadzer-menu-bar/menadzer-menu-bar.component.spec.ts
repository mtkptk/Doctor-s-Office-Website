import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerMenuBarComponent } from './menadzer-menu-bar.component';

describe('MenadzerMenuBarComponent', () => {
  let component: MenadzerMenuBarComponent;
  let fixture: ComponentFixture<MenadzerMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
