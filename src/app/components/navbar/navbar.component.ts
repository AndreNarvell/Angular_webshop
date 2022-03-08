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

  itemsInCheckout: number = 0;

  constructor(private httpFetch: HttpFetchService) {}

  //Checking total amount of items in cart from LS
  ngOnInit(): void {
    this.httpFetch.itemsInCart$.subscribe((itemsInCartFromService) => {
      this.itemsInCheckout = itemsInCartFromService;
    });

    let itemsInCheckoutNr: string =
      localStorage.getItem('itemsInBasket') || '[]';
    this.itemsInCheckout = JSON.parse(itemsInCheckoutNr);
  }
}
