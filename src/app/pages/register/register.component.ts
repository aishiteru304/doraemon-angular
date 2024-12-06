import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toast: NgToastService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleRegister() {
    this.userService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.toast.success(res?.message);
        this.router.navigate(["/login"]);
      },
      error: (err: any) => {
        if (err?.status == 400) {
          this.toast.danger(err?.error.message);
        }
        console.log(err)
      }
    })
  }
}
