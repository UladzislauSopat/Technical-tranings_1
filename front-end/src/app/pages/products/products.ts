import { Component, OnInit } from '@angular/core';
import { MainTable } from '../../components/main-table/main-table';
import { ApiService } from '../../services/api-service';
import { ColDef } from 'ag-grid-community';
import { IProduct } from '../../models/product';
import { IProductPage, prodFields } from './constants/products';
import { CommonModule } from '@angular/common';
import { ModaService } from '../../services/moda-service';

@Component({
  selector: 'app-products',
  imports: [MainTable, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  ModalType = "product";
  dataToAdd: IProduct | null | undefined;
  produstsColumns: ColDef[] = [
    {field: prodFields.prodId, flex: 1},
    {field: prodFields.category, flex: 1},
    {field: prodFields.name, flex: 1},
    {field: prodFields.quty, flex: 1, editable: true},
    {field: prodFields.suppl, flex: 1},
    {field: prodFields.price, flex: 1, editable: true}
  ];
  initialData?: IProduct[];
  productsData: IProductPage[] = [];
  emptyRow = {
    [prodFields.prodId]: "",
    [prodFields.category]: "",
    [prodFields.name]: "",
    [prodFields.quty]: "",
    [prodFields.suppl]: "",
    [prodFields.price]: ""
  }
  constructor(
    private api: ApiService,
    private modalServise: ModaService
  ) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((data: IProduct[]) => {
    this.initialData = data;
    const updatedProducts: IProductPage[] = data.map((product: IProduct) => ({
      [prodFields.prodId]: product.id ?? 0,
      [prodFields.category]: product.category?.name ?? '',
      [prodFields.name]: product.name ?? '',
      [prodFields.quty]: product.quantity ?? 0,
      [prodFields.suppl]: product.supplier?.name ?? '',
      [prodFields.price]: product.price ?? 0
    }));

    this.productsData = updatedProducts;
    });
    this.modalServise.data$.subscribe(data => {
      console.log(data);
      const dataToAdd: IProduct = {
        name: data?.[prodFields.name] ?? '',
        price: data?.[prodFields.price] ?? 0,
        quantity: data?.[prodFields.quty] ?? 0,
        description: "",
        categoryId: 0,
        category: {
          name: data?.[prodFields.category] ?? ''
        },
        supplierId: 0,
        supplier: {
          name: data?.[prodFields.suppl] ?? '',
          email: ''
        }
      };
      this.addProduct(dataToAdd);
    });
  }

  changedRow(rowData: IProductPage) {
    const product = this.initialData?.find((prod: IProduct) => prod.id === rowData[prodFields.prodId]);
    if (product && product.id) {
      product.price = rowData[prodFields.price];
      product.quantity = rowData[prodFields.quty];
      this.api.refactoreProductById(product.id, product).subscribe();
    }
  }

  addProduct(data: IProduct) {
  if (data.name) {
    this.api.addProducts(data).subscribe(data => {
      const prodToInsert: IProductPage = {
        [prodFields.prodId]: data.id,
        [prodFields.category]: data.category?.name ?? '',
        [prodFields.name]: data.name ?? '',
        [prodFields.quty]: data.quantity ?? 0,
        [prodFields.suppl]: data.supplier?.name ?? '',
        [prodFields.price]: data.price ?? 0
      };
      this.productsData = [...this.productsData, prodToInsert];
    });
  }
}

  addProductModal() {
    this.modalServise.open(this.ModalType);
  }
}
