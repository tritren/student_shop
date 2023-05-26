import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoleResponse } from '../models/customer.model';

@Injectable({ providedIn: 'root' })

export class StateUserService {

  private userRole$: BehaviorSubject<IRoleResponse | null> = new BehaviorSubject<IRoleResponse | null>(null);

  getUserRole() {
    return this.userRole$.asObservable();
  }

  setUserRole(v: IRoleResponse | null) {
    this.userRole$.next(v)
  }

}
