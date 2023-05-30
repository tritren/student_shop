import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWorker } from '../models/worker.model';

@Injectable()
export class WorkerService {
  private url: string = environment.appUrl;

  constructor(public http: HttpClient) { }

  getWorkerList(): Observable<IWorker[]> {
    return this.http.get<IWorker[]>(this.url + '/api/Worker');
  }

}
