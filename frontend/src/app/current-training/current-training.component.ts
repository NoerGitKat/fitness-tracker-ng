import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingDialogComponent } from '../stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer!: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingDialogComponent, {
      data: { progress: this.progress },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the result is', result);
    });
  }
}
