export interface IProduct {
  id: number;
  categoryID: number;
  name: string;
  price: number
  count: number
  description: string;
  bought?: number;
}
