import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
import { IOrder } from '../models/IOrder';
// import { IMovieCategory } from '../interfaces/IMovieCategory';

@Injectable({
  providedIn: 'root',
})
export class HttpFetchService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private adminOrders = new Subject<IOrder[]>();
  adminOrders$ = this.adminOrders.asObservable();

  // Not working yet
  // private category = new Subject<IMovieCategory[]>();
  // category$ = this.category.asObservable();

  private itemsInCart = new Subject<number>();
  itemsInCart$ = this.itemsInCart.asObservable();

  constructor(private http: HttpClient) {}

  //Fetching products from api
  getProducts() {
    this.http
      .get<IProduct[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data) => {
        this.products.next(data);
      });
  }

  // Not working yet
  // getCategories(category: string) {
  //   this.http
  //     .get<IMovieCategory[]>(
  //       'https://medieinstitutet-wie-products.azurewebsites.net/api/categories'
  //     )
  //     .pipe(
  //       map((response) =>
  //         response.find((movieCategory) => movieCategory.name === category)
  //       )
  //     )
  //     .subscribe((category: any) => {
  //       this.category.next(category);
  //     });
  // }

  //Fetching orders to admin page
  getPurchasesToAdmin() {
    this.http
      .get<IOrder[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=34'
      )
      .subscribe((data: IOrder[]) => {
        this.adminOrders.next(data);
      });
  }

  //Deleting orders in admin
  adminDeleteOrder(id: number) {
    this.http
      .delete(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/orders/' +
          id +
          '?companyId=34'
      )
      .subscribe(() => this.getPurchasesToAdmin());
  }

  //Tracking amount of items in cart
  updateBasketItemNumber(itemsInCart: number) {
    this.itemsInCart.next(itemsInCart);
  }
}
