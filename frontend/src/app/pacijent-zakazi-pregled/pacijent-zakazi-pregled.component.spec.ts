import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentZakaziPregledComponent } from './pacijent-zakazi-pregled.component';

describe('PacijentZakaziPregledComponent', () => {
  let component: PacijentZakaziPregledComponent;
  let fixture: ComponentFixture<PacijentZakaziPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijentZakaziPregledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijentZakaziPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
