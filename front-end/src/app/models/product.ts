export interface IProduct {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  categoryId: number;
  description: string;
  category?: {
    id?: number;
    name: string;
  },
  supplierId: number;
  supplier?: {
    id?: number;
    name: string;
    email: string;
  }
}