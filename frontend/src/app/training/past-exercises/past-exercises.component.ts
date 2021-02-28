import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-exercises',
  templateUrl: './past-exercises.component.html',
  styleUrls: ['./past-exercises.component.scss'],
})
export class PastExercisesComponent implements OnInit {
  exercisesColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pastExercisesData = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.pastExercisesData.data = this.trainingService.getCompletedExercises();
  }
}
