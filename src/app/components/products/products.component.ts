import { Component, Input, OnInit } from '@angular/core';
import { HttpFetchService } from 'src/app/services/http-fetch.service';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  product!: IProduct;
  boughtProducts: IProduct[] = [];

  constructor(
    private httpFetch: HttpFetchService,
    private LSservice: LocalStorageService
  ) {}

  ngOnInit() {
    this.getApiProducts();
    this.boughtProducts = JSON.parse(this.LSservice.getLocalstorage('LScart'));
  }

  getApiProducts() {
    this.httpFetch.products$.subscribe((data) => {
      this.products = data;
    });
    this.httpFetch.getProducts();
  }

  buyMovie(movie: any) {
    this.boughtProducts.push(movie);
    this.LSservice.setLocalstorage('LScart', this.boughtProducts);
  }
}
