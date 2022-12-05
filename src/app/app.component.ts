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
    { field: 'date', header: 'Date' },
  ];
  headers: string[] = this.columns.map((x) => x.field);
  headersFilters = this.headers.map((x, i) => x + '_' + i);
  filtersModel = [];
  filterKeys = {};
  toggleFilters = false;
  setDate = new Date();
  ELEMENT_DATA = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      date: this.setDate,
    },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      date: this.setDate,
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      date: this.setDate,
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      date: this.setDate,
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      date: this.setDate,
    },
    {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      date: this.setDate,
    },
    {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      date: this.setDate,
    },
    {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      date: this.setDate,
    },
    {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      date: this.setDate,
    },
    {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      date: this.setDate,
    },
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  constructor() {
    this.dataSource.filterPredicate = this.createFilter(this.columns);
  }
  createFilter(columns): (data: any, filter: string) => boolean {
    debugger;
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(data);
      let retValue = [];
      let i = 0;
      columns
        .filter((z) => z.header != undefined)
        .map((y) => y.header)
        .forEach((x) => {
          let key = x.toLowerCase();
          if (key) {
            retValue[i] =
              !searchTerms[key] ||
              data[key]
                .toString()
                .toLowerCase()
                .includes(searchTerms[key].toString().toLowerCase());
            i++;
          }
        });
      return retValue.findIndex((x) => x === false) < 0;
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
