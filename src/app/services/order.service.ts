import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private order = new Subject<IOrder>();
  order$ = this.order.asObservable();

  constructor(private http: HttpClient) {}
  createOrder(order: IOrder) {
    this.http
      .post<IOrder>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
        order
      )
      .subscribe((myOrder: IOrder) => {
        this.order.next(myOrder);
      });
  }
}
