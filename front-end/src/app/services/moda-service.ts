import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductPage, prodFields } from '../pages/products/constants/products';
import { IAddProduct } from '../models/addItemForm';

@Injectable({
  providedIn: 'root'
})
export class ModaService {
  private modalState = new BehaviorSubject<{ModalType: string, show: boolean} | null>(null);
  private data = new BehaviorSubject<IProductPage | null>(null);

  data$ = this.data.asObservable();
  modalState$ = this.modalState.asObservable();

  open(ModalType: string) {
    this.modalState.next({
      ModalType,
      show: true
    });
  }

  updateData(data: IAddProduct) {
    const dataTosend = {
      [prodFields.category]: data.category,
      [prodFields.name]: data.Name,
      [prodFields.quty]: data.quty,
      [prodFields.suppl]: data.suppl,
      [prodFields.price]: data.price
    };
    console.log(dataTosend);
    this.data.next(dataTosend);
  }

  close() {
    this.modalState.next(null)
  }
}
