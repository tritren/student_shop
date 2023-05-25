import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { RegUserModel } from 'src/app/models/reg-user.medel';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
// import { AuthService } from '../../service/auth.service';
// import { RegUserModel } from 'src/app/models/reg-user.medel';
// import { ISeoPage } from 'src/app/models/seo-page.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.less']
})
export class RegComponent extends BaseDestroyableComponent {

  public regForm!: UntypedFormGroup;
  public passwordVisible = false;
  public passwordVisible2 = false;

  constructor(
    private fb: UntypedFormBuilder,
    // private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
  ) {
    super();
    this.initForm();
  }


  initForm() {
    this.regForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
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
    /** wait for refresh value */
    Promise.resolve().then(() => this.regForm.controls['confirmPassword'].updateValueAndValidity());
  }

  /**
   * регистрируем нового пользователя
   */
  registerUser(): void {
    if (this.regForm.valid) {
      const user = new RegUserModel(this.regForm.value);
      const mail = this.regForm.get('email')?.value;
      // this.authService.registerUser(user).pipe(
      //   takeUntil(this.subscriptions)).subscribe((data) => {
      //     if (data?.success) {
      //       this.regForm.reset()
      //       this.notification.create('info', 'Успешная регистрация', `Для завершение регистрации, подтвердите ее на ${mail}`,
      //         { nzPlacement: 'topRight', nzClass: 'notification', nzDuration: 4500 })
      //         .onClose.subscribe((x) => this.router.navigate(['/']));
      //     }
      //   })
    }
  };
}
