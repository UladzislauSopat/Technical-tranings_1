import { Component, OnInit } from '@angular/core';
import { MainTable } from '../../components/main-table/main-table';
import { ApiService } from '../../services/api-service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-products',
  imports: [MainTable],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  produstsColumns: ColDef[] = [
    {field: "product Id"},
    {field: "Category"},
    {field: "Name"},
    {field: "Quantity"},
    {field: "Supplier"},
    {field: "Price"}
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.api.getProducts().subscribe((data) => {
    //   console.log(data);
    // });
  }

}
