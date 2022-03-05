import { IProduct } from '../interfaces/IProduct';

export class OrderRow {
  id: number;
  productId: number;
  product: IProduct;
  amount: number;
  orderId: number;

  constructor(
    id: number,
    productId: number,
    product: IProduct,
    amount: number,
    orderId: number
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.amount = amount;
    this.orderId = orderId;
  }
}
