import { Subject } from 'rxjs';
import { Exercise } from './../models/exercise.model';

export class TrainingService {
  public trainingChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 20 },
    { id: 'pushups', name: 'Push Ups', duration: 40, calories: 30 },
    { id: 'burpees', name: 'Burpees', duration: 15, calories: 45 },
    { id: 'squats', name: 'Squats', duration: 50, calories: 100 },
  ];
  private runningExercise!: Exercise | undefined;
  private completedExercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice(); // Creates new copy
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
      state: 'completed',
    });
    this.runningExercise = undefined;
    this.trainingChanged.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
