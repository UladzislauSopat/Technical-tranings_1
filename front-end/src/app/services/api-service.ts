import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { ICategory } from '../models/category';
import { IProduct } from '../models/product';
import { ISupplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${enviroment.apiUrl}/Categories`);
  }

  addCategory(name: string): Observable<ICategory> {
    return this.http.post<ICategory>(`${enviroment.apiUrl}/Categories`, name);
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${enviroment.apiUrl}/Products`);
  }

  addProducts(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${enviroment.apiUrl}/Products`, product)
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${enviroment.apiUrl}/Products/${id}`);
  }

  refactoreProductById(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${enviroment.apiUrl}/Products/${id}`, product)
  }

  deletetProductById(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${enviroment.apiUrl}/Products/${id}`);
  }

  getSuppliers(): Observable<ISupplier[]> {
    return this.http.get<ISupplier[]>(`${enviroment.apiUrl}/Suppliers`);
  }

  addSupplier(suppliers: ISupplier): Observable<ISupplier> {
    return this.http.post<ISupplier>(`${enviroment.apiUrl}/Suppliers`, suppliers);
  }

  getSupplier(id: number): Observable<ISupplier> {
    return this.http.get<ISupplier>(`${enviroment.apiUrl}/Suppliers/${id}`);
  }

  refactoreSupplierById(id: number, product: ISupplier): Observable<ISupplier> {
    return this.http.put<ISupplier>(`${enviroment.apiUrl}/Suppliers/${id}`, product)
  }

  deletetSupplierById(id: number): Observable<ISupplier> {
    return this.http.delete<ISupplier>(`${enviroment.apiUrl}/Suppliers/${id}`);
  }
}
