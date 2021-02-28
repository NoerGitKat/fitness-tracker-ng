import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-exercises',
  templateUrl: './past-exercises.component.html',
  styleUrls: ['./past-exercises.component.scss'],
})
export class PastExercisesComponent implements OnInit, AfterViewInit {
  exercisesColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pastExercisesData = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.pastExercisesData.data = this.trainingService.getCompletedExercises();
  }

  ngAfterViewInit() {
    this.pastExercisesData.sort = this.sort;
  }
}
