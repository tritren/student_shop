import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export abstract class BaseDestroyableComponent implements OnDestroy {
  protected readonly subscriptions = new ReplaySubject<any>(1);


  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }
}
