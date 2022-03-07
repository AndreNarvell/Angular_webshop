import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { HttpFetchService } from 'src/app/services/http-fetch.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartProducts: IProduct[] = [];

  itemsInBasket: number = 0;

  constructor(private httpFetch: HttpFetchService) {}

  ngOnInit(): void {
    this.httpFetch.amountOfItems$.subscribe((amountOfItemsFromService) => {
      this.itemsInBasket = amountOfItemsFromService;
    });

    let itemsInBasketNr: string = localStorage.getItem('itemsInBasket') || '[]';
    this.itemsInBasket = JSON.parse(itemsInBasketNr);
  }
}
