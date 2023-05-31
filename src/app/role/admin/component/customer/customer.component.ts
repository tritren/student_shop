import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less'],
  providers: [CustomerService]
})
export class CustomerComponent extends BaseDestroyableComponent {
  public regForm!: UntypedFormGroup;
  public passwordVisible = false;
  public passwordVisible2 = false;
  customerList$!: Observable<ICustomer[]>
  public isVisible = false;

  constructor(
    private customerService: CustomerService,
    private fb: UntypedFormBuilder,
  ) {
    super();
    this.getCustomer();
  }



  getCustomer() {
    this.customerList$ = this.customerService.getCustomerList();

  }

  editCustomer(item: ICustomer) {
    this.isVisible = !this.isVisible;
    this.regForm = this.fb.group({
      id: [item.id, [Validators.required]],
      fullName: [item.fullName, [Validators.required]],
      login: [item.login, [Validators.required]],
      mail: [item.mail, [Validators.required]],
      phone: [item.phone, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }


  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.regForm.controls['confirmPassword'].updateValueAndValidity());
  }

  registerUser(): void {
    if (this.regForm.valid) {

      this.customerService.updateWorker(this.regForm.value)
        .pipe(
          takeUntil(this.subscriptions))
        .subscribe(() => {
          this.isVisible = !this.isVisible;
          this.getCustomer();
        })



    }
  };


  private confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.regForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleCancel(): void {
    this.isVisible = false;
  }
}
