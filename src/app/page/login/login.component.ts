import { AuthService } from './../../auth/auth.service';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  err = '';

  constructor(private fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    const val = this.form.value;

    this.err = this.authService.authErr;


    if (val.email && val.password) {
      this.err = this.authService.authErr;

      this.authService.login(val.email, val.password);
      setTimeout(() => {
        this.close()
      }, 1000);
    }
  }

  close(): void {
    this.err = '';
    this.authService.authErr = '';
  }
}
