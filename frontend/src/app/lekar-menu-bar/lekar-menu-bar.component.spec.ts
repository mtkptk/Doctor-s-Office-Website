import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarMenuBarComponent } from './lekar-menu-bar.component';

describe('LekarMenuBarComponent', () => {
  let component: LekarMenuBarComponent;
  let fixture: ComponentFixture<LekarMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
