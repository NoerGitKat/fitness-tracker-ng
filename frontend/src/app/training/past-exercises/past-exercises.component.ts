import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-exercises',
  templateUrl: './past-exercises.component.html',
  styleUrls: ['./past-exercises.component.scss'],
})
export class PastExercisesComponent
  implements OnInit, AfterViewInit, OnDestroy {
  exercisesColumns = ['date', 'name', 'duration', 'calories', 'state'];
  pastExercisesData = new MatTableDataSource<Exercise>();
  private pastExercisesSuscription!: Subscription;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  // Lifecycle hook
  ngOnInit(): void {
    this.pastExercisesSuscription = this.trainingService.completedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.pastExercisesData.data = exercises;
      }
    );
    this.trainingService.fetchCompletedExercises();
  }

  // Lifecycle hook
  ngAfterViewInit() {
    this.pastExercisesData.sort = this.sort;
    this.pastExercisesData.paginator = this.paginator;
  }

  filterTable(inputValue: HTMLInputElement) {
    const filterValue = inputValue.value;
    if (filterValue) {
      this.pastExercisesData.filter = filterValue.trim().toLowerCase();
    } else {
      this.trainingService.fetchCompletedExercises();
    }
  }

  ngOnDestroy() {
    this.pastExercisesSuscription.unsubscribe();
  }
}
