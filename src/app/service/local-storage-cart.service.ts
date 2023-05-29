import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class StorageForCartItemService {

  private productList$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  private key: string = 'cart-list';

  constructor() { }


  getProductList() {
    return this.productList$.asObservable();
  }

  setProductList(v: string | null) {
    if (v) {
      this.productList$.next(JSON.parse(v));
    }
  }


  addItem(value: IProduct): void {
    let storageItem = localStorage.getItem(this.key);
    if (!storageItem || storageItem == 'undefined') {
      localStorage.setItem(this.key, JSON.stringify([value]));
    } else {
      if (![...JSON.parse(storageItem)].some(v => v.id == value.id)) {
        localStorage.setItem(this.key, JSON.stringify([...JSON.parse(storageItem), ...[value]]));
      } else {
        let countData = [...JSON.parse(storageItem)];
        countData.forEach((v: IProduct) => {
          if (v.id == value.id) {
            v.bought = v.bought + value.bought
            v.price = v.price + value.price
          }
        })
        localStorage.setItem(this.key, JSON.stringify(countData));
      }
    }
    this.setProductList(localStorage.getItem(this.key))
  }

  removeItem(): void {

  }

  removeAllItem(): void {
    localStorage.removeItem(this.key);
    this.setProductList('[]');
  }

  getItem(): IProduct[] {
    let storageItem = localStorage.getItem(this.key);
    if (storageItem) {
      return JSON.parse(storageItem);
    }
    return [];
  }
}
