import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastExercisesComponent } from './past-exercises.component';

describe('PastExercisesComponent', () => {
  let component: PastExercisesComponent;
  let fixture: ComponentFixture<PastExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastExercisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
