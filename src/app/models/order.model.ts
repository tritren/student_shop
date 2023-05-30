export interface IOrder {
  customerID: number;
  managerID: number;
  workerID: number;
  addressFrom: string;
  addressTo: string;
  description: string;
  items: IOrderItem[];
  status: string
  id: string;
}

export interface IOrderItem {
  itemID: number;
  price: number;
}
