import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/IOrder';
import { HttpFetchService } from 'src/app/services/http-fetch.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  adminOrders: IOrder[] = [];

  constructor(private httpFetch: HttpFetchService) {}

  ngOnInit(): void {
    this.getCompletedOrders();
  }

  getCompletedOrders() {
    this.httpFetch.adminOrders$.subscribe((data) => {
      this.adminOrders = data;
    });
    this.httpFetch.getPurchasesToAdmin();
  }

  deleteOrder(id: number) {
    this.httpFetch.adminDeleteOrder(id);
  }
}
