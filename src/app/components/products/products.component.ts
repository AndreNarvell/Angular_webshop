import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpFetchService } from 'src/app/services/http-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  product!: IProduct;
  boughtProducts: IProduct[] = [];

  constructor(
    private httpFetch: HttpFetchService,
    private LSservice: LocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getApiProducts();
    this.boughtProducts = JSON.parse(this.LSservice.getLocalstorage('LScart'));
  }

  //Fetching all products from API
  getApiProducts() {
    this.httpFetch.products$.subscribe((data) => {
      this.products = data;
    });
    this.httpFetch.getProducts();
  }

  //Snackbar when adding movie to cart
  buySnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar'],
    });
  }

  //Adding movie to cart
  buyMovie(movie: any) {
    this.boughtProducts.push(movie);
    this.LSservice.setLocalstorage('LScart', this.boughtProducts);

    this.httpFetch.updateBasketItemNumber(this.boughtProducts.length);
    localStorage.setItem(
      'itemsInBasket',
      JSON.stringify(this.boughtProducts.length)
    );
  }
}
