import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Exercise } from './../models/exercise.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  public trainingChanged = new Subject<Exercise>();
  public exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise!: Exercise | undefined;
  private completedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          const mappedDocs = docArray.map((doc: any) => {
            const { calories, name, duration } = doc.payload.doc.data();

            return {
              id: doc.payload.doc.id,
              name,
              calories,
              duration,
            };
          });
          return mappedDocs;
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(id: string) {
    const selectedExercise = this.availableExercises.find(
      (exercise) => exercise.id === id
    );

    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.trainingChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = undefined;
    this.trainingChanged.next(undefined);
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.runningExercise!,
      duration: this.runningExercise!.duration * (progress / 100),
      calories: this.runningExercise!.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = undefined;
    this.trainingChanged.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedExercises() {
    return [...this.completedExercises];
  }
}
