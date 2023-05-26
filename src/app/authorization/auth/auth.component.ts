import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { AuthService } from '../../service/auth.service';
import { IRegUserModel } from 'src/app/models/reg-user.model';
import { StateUserService } from 'src/app/service/state.auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent extends BaseDestroyableComponent implements OnInit {

  public userLoginForm!: UntypedFormGroup;
  public cookie!: string

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private stateUserService: StateUserService,
    private notification: NzNotificationService,
    private router: Router,
  ) { super(); }

  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.userLoginForm = this.fb.group({
      role: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }



  public userLogin(): void {
    if (this.userLoginForm.valid) {
      this.authService.authorizationUser({ ...this.userLoginForm.value } as IRegUserModel)
        .pipe(takeUntil(this.subscriptions))
        .subscribe({
          next: (value) => {
            this.stateUserService.setUserRole(value);
            this.cookieService.set('token', JSON.stringify(value), { path: '/' });
            this.router.navigate(['/'])
          },
          error: () => {
            this.notification.create('error', 'Ошибка', `Логин, роль или пароль введены не верно!`,
              { nzPlacement: 'bottomRight', nzClass: 'notification', nzDuration: 4500 })
          }
        })
    }
  }
}
