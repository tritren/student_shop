import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { StateUserService } from 'src/app/service/state.auth.service';


@Component({
  selector: 'app-reg',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.less'],

})
export class RegComponent extends BaseDestroyableComponent {

  public regForm!: UntypedFormGroup;
  public passwordVisible = false;
  public passwordVisible2 = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private stateUserService: StateUserService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    super();
    this.initForm();
  }


  initForm() {
    this.regForm = this.fb.group({
      fullName: [null, [Validators.required]],
      login: [null, [Validators.required]],
      phone: [null, [Validators.required,]],
      mail: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  private confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.regForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.regForm.controls['confirmPassword'].updateValueAndValidity());
  }

  /**
   * регистрируем нового пользователя
   */
  registerUser(): void {
    if (this.regForm.valid) {
      this.authService.registrationCustomer({ ...this.regForm.value })
        .pipe(
          takeUntil(this.subscriptions))
        .subscribe(resp => {
          this.stateUserService.setUserRole(resp);
          this.cookieService.set('token', JSON.stringify(resp), { path: '/' });
          this.router.navigate(['/'])
        })
    }
  };
}
