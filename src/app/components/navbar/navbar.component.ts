import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  cartProducts: IProduct[] = [];

  constructor(private LSservice: LocalStorageService) {}

  ngOnInit(): void {
    this.cartProducts = JSON.parse(this.LSservice.getLocalstorage('LScart'));
  }
}
