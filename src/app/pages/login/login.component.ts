import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toast: NgToastService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleLogin() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.userService.setUserToSessionStorage(res.data)
        window.location.href = "/"
      },
      error: (err: any) => {
        if (err?.status == 401) {
          this.toast.danger("Invalid email or password");
        }
        console.log(err)
      }
    })

  }
}
