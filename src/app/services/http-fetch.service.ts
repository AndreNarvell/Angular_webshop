import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root',
})
export class HttpFetchService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private ordersMade: IOrder[] = [];

  private adminOrders = new Subject<IOrder[]>();
  adminOrders$ = this.adminOrders.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<IProduct[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data) => {
        this.products.next(data);
      });
  }

  makePurchase(order: IOrder) {
    this.ordersMade.push(order);

    return this.http.post<IOrder>(
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
      order
    );
  }

  getPurchasesToAdmin() {
    this.http
      .get<IOrder[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=34'
      )
      .subscribe((data: IOrder[]) => {
        this.adminOrders.next(data);
      });
  }

  adminDeleteOrder(id: number) {
    this.http
      .delete(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' +
          id +
          '?companyId=34'
      )
      .subscribe(() => this.getPurchasesToAdmin());
  }
}
