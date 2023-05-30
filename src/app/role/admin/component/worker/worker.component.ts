import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { ICustomer } from 'src/app/models/customer.model';
import { IWorker } from 'src/app/models/worker.model';

import { WorkerService } from 'src/app/service/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.less'],
  providers: [WorkerService]

})
export class WorkerComponent extends BaseDestroyableComponent {

  public regForm!: UntypedFormGroup;
  public passwordVisible = false;
  public passwordVisible2 = false;
  public WorkerList$!: Observable<any>;
  public isVisible = false;
  public edit = false;

  constructor(
    private workerService: WorkerService,
    private fb: UntypedFormBuilder,
  ) {
    super();
    this.getWorker();
  }

  getWorker() {
    this.WorkerList$ = this.workerService.getWorkerList();
  }

  confirmRemove(val: IWorker) {
    this.workerService.removeWorker(val)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => this.getWorker())
  }

  initForm() {
    this.regForm = this.fb.group({
      fullName: [null, [Validators.required]],
      login: [null, [Validators.required]],
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

  addWorker() {
    this.isVisible = !this.isVisible;
    this.initForm();
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.regForm.controls['confirmPassword'].updateValueAndValidity());
  }

  registerUser(): void {
    if (this.regForm.valid) {
      if (!this.edit) {
        this.workerService.createWorker({ ...this.regForm.value } as IWorker)
          .pipe(
            takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = !this.isVisible;
            this.getWorker();
          })
      } else {
        this.workerService.updateWorker({ ...this.regForm.value } as IWorker)
          .pipe(
            takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = !this.isVisible;
            this.getWorker();
          })
      }
      this.edit = false;
    }
  };

  editWorker(Worker: IWorker) {
    this.isVisible = !this.isVisible;
    this.edit = !this.edit;
    this.regForm = this.fb.group({
      id: [Worker.id, [Validators.required]],
      fullName: [Worker.fullName, [Validators.required]],
      login: [Worker.login, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
