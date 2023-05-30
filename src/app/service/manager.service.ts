import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IManager } from '../models/manager';
import { ICustomer, IRoleResponse } from '../models/customer.model';

@Injectable()
export class ManagerService {

  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getAllManager(): Observable<IManager[]> {
    return this.http.get<IManager[]>(this.url + '/api/Manager');
  }

  createManager(manager: ICustomer): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.url + '/api/Manager', manager);
  }

  removeManger(manager: ICustomer) {
    return this.http.delete<IRoleResponse>(this.url + `/api/Manager/${manager.id}`);
  }

  updateManager(manager: ICustomer) {
    return this.http.put<IRoleResponse>(this.url + `/api/Manager/${manager.id}`, manager);
  }


}
