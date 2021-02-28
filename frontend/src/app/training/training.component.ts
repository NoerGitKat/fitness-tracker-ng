import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  hasOngoingTraining = false;
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.trainingChanged.subscribe(
      (exerciseStatus) => {
        if (exerciseStatus) {
          this.hasOngoingTraining = true;
        } else {
          this.hasOngoingTraining = false;
        }
      }
    );
  }

  onExitTraining() {
    console.log('training exited!');
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
