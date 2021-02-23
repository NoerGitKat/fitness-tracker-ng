import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  signup(form: NgForm) {
    this.authService.register({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
