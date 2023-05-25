import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
// import { IAuthModel } from 'src/app/models/auth.model';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent extends BaseDestroyableComponent implements OnInit {

  public userLoginForm!: UntypedFormGroup;
  public cookie!: string
  // public encodingJwt!: IAuthModel
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    // private jwtHelperService: JwtHelperService,

    private router: Router,
  ) {
    super();
  }


  ngOnInit(): void {
    this.initForm()
    this.loginVerification();
  }


  initForm() {
    this.userLoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }


  loginVerification() {
    this.cookie = this.cookieService.get('access_token');
    if (this.cookie) {
      // this.encodingJwt = this.jwtHelperService.decodeToken(this.cookie) as IAuthModel;
      // if (this.encodingJwt.roles.some(v => v.value === "ADMIN")) {
      //   this.router.navigate(['admin/dashboard'])
      // } else if (this.encodingJwt.roles.some(v => v.value === "USER")) {
      //   this.router.navigate(['/'])
      // }
    }
  }




  public userLogin(): void {
    if (this.userLoginForm.valid) {
      // this.authService.login(this.userLoginForm.value)
      //   .pipe(takeUntil(this.subscriptions)).subscribe((data) => {
      //     if (data.success) {
      //       this.router.navigate(data.role == 'ADMIN' ? ['admin/dashboard'] : ['/personal-account'])
      //     }
      //   })
    }
  }
}
