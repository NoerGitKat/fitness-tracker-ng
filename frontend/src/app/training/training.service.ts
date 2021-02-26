import { Exercise } from './../models/exercise.model';

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 20 },
    { id: 'pushups', name: 'Push Ups', duration: 40, calories: 30 },
    { id: 'burpees', name: 'Burpees', duration: 15, calories: 45 },
    { id: 'squats', name: 'Squats', duration: 50, calories: 100 },
  ];

  getAvailableExercises() {
    return this.availableExercises.slice(); // Creates new copy
  }
}
