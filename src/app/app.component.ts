import { Component } from '@angular/core';
import { computeLineStartsMap } from '@angular/core/schematics/utils/line_mappings';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columns = [
    { field: 'filter' },
    { field: 'position', header: 'Position' },
    { field: 'name', header: 'Name' },
    { field: 'weight', header: 'Weight' },
    { field: 'symbol', header: 'Symbol' },
  ];
  headers: string[] = this.columns.map((x) => x.field);
  headersFilters = this.headers.map((x, i) => x + '_' + i);
  filtersModel = [];
  filterKeys = {};
  toggleFilters = false;
  ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor() {
    let filter = this.createFilter(this.columns);
    console.log(filter.prototype);
    this.dataSource.filterPredicate = filter;
  }
  createFilter(columns): (data: any, filter: string) => boolean {
    debugger;
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let retValue = [];
      let i = 0;
      columns
        .filter((t) => t.header)
        .forEach((x) => {
          let key = x.header.toLowerCase();

          retValue[i] =
            !searchTerms[key] ||
            data[key].toString().toLowerCase().includes(searchTerms[key]);
          i++;
        });
      //console.log(retValue);
      let a =
        !searchTerms.position ||
        data.position.toString().toLowerCase().includes(searchTerms.position);
      //console.log(a);
      let b =
        !searchTerms.name ||
        data.name.toString().toLowerCase().includes(searchTerms.name);
      //console.log(b);
      let c =
        !searchTerms.weight ||
        data.weight.toString().toLowerCase().includes(searchTerms.weight);
      //console.log(c);
      let d =
        !searchTerms.symbol ||
        data.symbol.toString().toLowerCase().includes(searchTerms.symbol);
      // console.log(d);

      return retValue.reduce((x) => x);
    };
    return filterFunction;
  }
  searchColumns() {
    this.filtersModel.forEach((each, ind) => {
      this.filterKeys[this.columns[ind].field] = each || null;
    });
    this.dataSource.filter = JSON.stringify(this.filterKeys);
    //Call API with filters
  }

  clearFilters() {
    this.filtersModel = [];
    this.filterKeys = {};
    this.dataSource.filter = JSON.stringify(this.filterKeys);
    //Call API without filters
  }
}
