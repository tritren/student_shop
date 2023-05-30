import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { ICustomer } from 'src/app/models/customer.model';
import { IManager } from 'src/app/models/manager';
import { ManagerService } from 'src/app/service/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.less'],
  providers: [ManagerService]
})
export class ManagerComponent extends BaseDestroyableComponent {
  public regForm!: UntypedFormGroup;
  public passwordVisible = false;
  public passwordVisible2 = false;
  public managerList$!: Observable<any>;
  public isVisible = false;
  public edit = false;

  constructor(
    private managerService: ManagerService,
    private fb: UntypedFormBuilder,
  ) {
    super();
    this.getManager();
  }

  getManager() {
    this.managerList$ = this.managerService.getAllManager();
  }

  confirmRemove(val: ICustomer) {
    this.managerService.removeManger(val)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => this.getManager())
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

  addManager() {
    this.isVisible = !this.isVisible;
    this.initForm();
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.regForm.controls['confirmPassword'].updateValueAndValidity());
  }

  registerUser(): void {
    if (this.regForm.valid) {
      if (!this.edit) {
        this.managerService.createManager({ ...this.regForm.value })
          .pipe(
            takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = !this.isVisible;
            this.getManager();
          })
      } else {
        this.managerService.updateManager({ ...this.regForm.value })
          .pipe(
            takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = !this.isVisible;
            this.getManager();
          })
      }
      this.edit = false;
    }
  };

  editManager(manager: IManager) {
    this.isVisible = !this.isVisible;
    this.edit = !this.edit;
    this.regForm = this.fb.group({
      id: [manager.id, [Validators.required]],
      fullName: [manager.fullName, [Validators.required]],
      login: [manager.login, [Validators.required]],
      phone: [manager.phone, [Validators.required,]],
      mail: [manager.mail, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
