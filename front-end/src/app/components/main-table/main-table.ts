import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef, RowValueChangedEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeBalham  } from 'ag-grid-community';
import { IProductPage, prodFields } from '../../pages/products/constants/products';
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-main-tanle',
  imports: [AgGridAngular, AgGridModule],
  templateUrl: './main-table.html',
  styleUrl: './main-table.scss'
})
export class MainTable {

  gridOptions = {
    theme: themeBalham,
  }

  @Input() rowData: IProductPage[] | undefined;
  @Input() colDefs!: ColDef[];
  @Output() changedRow = new EventEmitter<any>();
  
  changedData(event: RowValueChangedEvent) {
    console.log('work');
    const updatedRow = event.data;
    this.changedRow.emit(updatedRow);
  }
}
