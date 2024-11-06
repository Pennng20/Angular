import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieItemsComponent } from './movie-items.component';

describe('MovielocationComponent', () => {
  let component: MovieItemsComponent;
  let fixture: ComponentFixture<MovieItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
