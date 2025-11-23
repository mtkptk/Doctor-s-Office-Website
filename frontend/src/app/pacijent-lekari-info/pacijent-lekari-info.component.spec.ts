import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentLekariInfoComponent } from './pacijent-lekari-info.component';

describe('PacijentLekariInfoComponent', () => {
  let component: PacijentLekariInfoComponent;
  let fixture: ComponentFixture<PacijentLekariInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentLekariInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentLekariInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
