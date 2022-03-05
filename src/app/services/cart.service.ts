import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // order = new Subject<IOrder>();
  // cartProducts: IProduct[] = [];

  constructor() {}
}
