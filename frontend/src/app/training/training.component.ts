import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  hasOngoingTraining = false;

  constructor() {}

  ngOnInit(): void {}

  toggleOngoingTraining() {
    this.hasOngoingTraining = !this.hasOngoingTraining;
  }
}
