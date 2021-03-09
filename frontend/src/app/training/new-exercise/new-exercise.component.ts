import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
})
export class NewExerciseComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => (this.exercises = exercises)
    );
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
