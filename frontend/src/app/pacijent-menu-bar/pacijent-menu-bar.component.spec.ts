import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentMenuBarComponent } from './pacijent-menu-bar.component';

describe('PacijentMenuBarComponent', () => {
  let component: PacijentMenuBarComponent;
  let fixture: ComponentFixture<PacijentMenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentMenuBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
