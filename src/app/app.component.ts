import { Component } from '@angular/core';
import { IProduct } from './interfaces/IProduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Webshop';
  cartProducts: IProduct[] = [];
}
