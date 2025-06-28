import { Component, Input } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeBalham  } from 'ag-grid-community';
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

  @Input() rowData!: [];
  @Input() colDefs!: ColDef[];
  
}
