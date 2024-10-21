import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielocationComponent } from './movielocation.component';

describe('MovielocationComponent', () => {
  let component: MovielocationComponent;
  let fixture: ComponentFixture<MovielocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovielocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovielocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
