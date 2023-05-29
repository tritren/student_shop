import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LocalStorageForCartItemService {

  private key: string = 'cart-list'

  private HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {

  }


  addItem(value: IProduct) {
    let storageItem = localStorage.getItem(this.key);
    if (!storageItem) {
      localStorage.setItem(this.key, JSON.stringify([value]));
    } else {
      if (![...JSON.parse(storageItem)].some(v => v.id == value.id)) {
        let newListItems = [...JSON.parse(storageItem), ...[value]];
        console.log(newListItems);
        localStorage.setItem(this.key, JSON.stringify(newListItems))
      } else {

      }
    }

  }

  removeItem() {

  }

}
