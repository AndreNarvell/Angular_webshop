import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrderRow } from 'src/app/interfaces/IOrderRow';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IOrder } from 'src/app/models/IOrder';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpFetchService } from 'src/app/services/http-fetch.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: IProduct[] = [];
  order!: IOrder;
  totalAmount: number = 0;
  orderRows: IOrderRow[] = [];

  constructor(
    private LSservice: LocalStorageService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private httpFetch: HttpFetchService
  ) {}

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  //Getting the total price
  getAmount() {
    this.totalAmount = this.cartProducts.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
  }

  ngOnInit(): void {
    this.cartProducts = JSON.parse(this.LSservice.getLocalstorage('LScart'));
    this.getAmount();
  }

  //Function for completing purchase
  completePurchase() {
    //Loop to check if there are more of the same id, if there is,
    //push them in the same orderRow and then add 1 to amount, otherwise add a new orderRow
    for (let i = 0; i < this.cartProducts.length; i++) {
      if (
        !this.orderRows.some(
          (movie) => movie.productId === this.cartProducts[i].id
        )
      ) {
        this.orderRows.push({
          productId: this.cartProducts[i].id,
          product: null,
          amount: 1,
        });
      } else {
        for (let j = 0; j < this.orderRows.length; j++) {
          if (this.orderRows[j].productId === this.cartProducts[i].id) {
            this.orderRows[j].amount++;
          }
        }
      }
    }
    this.order = new IOrder(
      new Date().toISOString().split('.')[0],
      this.userForm.value.username,
      this.totalAmount,
      this.orderRows
    );
    this.orderService.order$.subscribe((placedOrder: any) => {
      this.order = placedOrder;
    });

    this.orderService.createOrder(this.order);
    this.cartProducts = [];
    this.emptyCart();
    this.httpFetch.updateBasketItemNumber(this.cartProducts.length);
    this.LSservice.clearLocalstorage('itemsInBasket');
  }

  //Delete movie from cart, updating LS
  deleteMovie(id: number) {
    this.cartProducts.splice(id, 1);
    this.getAmount();
    this.LSservice.setLocalstorage('LScart', this.cartProducts);
    this.httpFetch.updateBasketItemNumber(this.cartProducts.length);
    localStorage.setItem(
      'itemsInBasket',
      JSON.stringify(this.cartProducts.length)
    );
  }

  //Empty cart, deleting LS
  emptyCart() {
    this.LSservice.clearLocalstorage('LScart');
    this.cartProducts = JSON.parse(this.LSservice.getLocalstorage('LScart'));

    this.httpFetch.updateBasketItemNumber(this.cartProducts.length);
    this.LSservice.clearLocalstorage('itemsInBasket');
  }

  //Snackbar when deleting movie
  deleteMovieSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar'],
    });
  }
  //Snackbar when completing a purchase
  orderCompletedSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar'],
    });
  }

  //Snackbar when emptying cart
  emptyCartSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar'],
    });
  }
}
