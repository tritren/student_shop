import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWorker } from '../models/worker.model';
import { ICustomer, IRoleResponse } from '../models/customer.model';

@Injectable()
export class WorkerService {
  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getWorkerList(): Observable<IWorker[]> {
    return this.http.get<IWorker[]>(this.url + '/api/Worker');
  }

  createWorker(worker: IWorker): Observable<IRoleResponse> {
    return this.http.post<IRoleResponse>(this.url + '/api/Worker', worker);
  }

  removeWorker(worker: IWorker) {
    return this.http.delete<IRoleResponse>(this.url + `/api/Worker/${worker.id}`);
  }

  updateWorker(worker: IWorker) {
    debugger
    return this.http.put<IRoleResponse>(this.url + `/api/Worker/${worker.id}`, worker);
  }

}
