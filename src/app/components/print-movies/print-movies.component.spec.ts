import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMoviesComponent } from './print-movies.component';

describe('PrintMoviesComponent', () => {
  let component: PrintMoviesComponent;
  let fixture: ComponentFixture<PrintMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
