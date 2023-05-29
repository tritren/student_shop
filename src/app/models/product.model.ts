export interface IProduct {
  id: number;
  categoryID: number;
  name: string;
  price: number;
  itemPrice: number;
  count: number
  description: string;
  bought: number;
  disabled: false;
  status: string;
}

export interface IUpdateProduct {
  categoryID: number;
  name: string;
  price: number;
  count: number
  description: string;
}
