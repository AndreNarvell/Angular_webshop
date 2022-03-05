import { IOrderRow } from '../interfaces/IOrderRow';

export class IOrder {
  id: number = 0;
  companyId: number = 34;
  created: string;
  createdBy: string;
  paymentMethod: string = 'Swish';
  totalPrice: number;
  status: number = 0;
  orderRows: IOrderRow[] = [];

  constructor(
    created: string,
    createdBy: string,
    totalPrice: number,
    orderRows: IOrderRow[]
  ) {
    this.created = created;
    this.createdBy = createdBy;
    this.totalPrice = totalPrice;
    this.orderRows = orderRows;
  }
}
