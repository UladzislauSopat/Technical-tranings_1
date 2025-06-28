export interface IProduct {
  id?: 0;
  name: string;
  price: 0;
  quantity: 0;
  categoryId: 0;
  description: string;
  category?: {
    id: 0;
    name: string;
  },
  supplierId: 0;
  supplier?: {
    id: 0;
    name: string;
    email: string;
  }
}