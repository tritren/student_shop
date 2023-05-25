export interface IProduct {
  id: number;
  categoryId: number;
  name: string;
  price: number
  quantity: number
  description: string;
  bought?: number;
}
