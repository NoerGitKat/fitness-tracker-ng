import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss'],
})
export class NewExerciseComponent implements OnInit {
  exercises: string[] = ['Crunches', 'Pushups', 'Leg Raises'];
  @Output() startTraining = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onStartTraining() {
    this.startTraining.emit();
  }
}
