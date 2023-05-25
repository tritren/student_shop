import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDestroyableComponent } from '../../abstrations/base-destroyable.component';
import { takeUntil } from 'rxjs';
// import { ConfirmEmailService } from 'src/app/service/confirm-email.service';
@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.less']
})
export class EmailConfirmComponent extends BaseDestroyableComponent implements OnInit {

  constructor(
    // private confirmEmailService: ConfirmEmailService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { super() }

  ngOnInit(): void {
    this.confirmEmail();
  }
  /**
   * При подтверждении электронной почты
   * (нажатии  кнопки "Подтвердить")
   * линка ведет на этот компонент
   */
  confirmEmail() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.subscriptions)).subscribe(params => {
        const token = params['token'];
        if (token) {
          // this.confirmEmailService.confirmEmail(token)
          //   .pipe(takeUntil(this.subscriptions)).subscribe(data => {
          //     if (data.success) this.router.navigate(data.role == 'ADMIN' ? ['admin/dashboard'] : ['/'])
          //   });
        }
      })
  }

}
