import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthService } from '@shared/services/auth/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private loginSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.generateLoginForm();
    console.log(environment.LOGIN_URL)
  }

  private generateLoginForm(): FormGroup {
    return this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(4), Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(5)]
      ],
      remember: ['']
    });
  }

  public submit(): void {
    if (this.form.valid) {
      Swal.fire({
        title: 'Iniciando Sesión',
        didOpen: () => {
          Swal.showLoading()
        },
      });
      this.loginSubscription = this.authService.login(this.form.value).subscribe((data) => {
        Swal.close();
        if (data.token) {
          window.localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            icon: 'success',
            title: 'Sesión iniciada correctamente',
            showConfirmButton: false,
            timer: 1000
          });
        }
      }, (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error}`,
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
