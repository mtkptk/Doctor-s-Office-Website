import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLekariComponent } from './list-lekari.component';

describe('ListLekariComponent', () => {
  let component: ListLekariComponent;
  let fixture: ComponentFixture<ListLekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
