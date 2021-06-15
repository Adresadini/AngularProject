import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddElementComponent } from '../add-element/add-element.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent implements OnInit, AfterViewInit {
  myList = [];

  displayedColumns: string[] = [
    'position',
    'name',
    'startPoint',
    'endPoint',
    'touristicMarking',
    'length',
    'levelDifference',
    'date',
    'actions',
  ];
  dataSource;
  symbolSearchValue;
  lastPosition;

  @ViewChild(MatSort) sort: MatSort;

  trailForm: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadList();
    this.dataSource = new MatTableDataSource(this.myList);

    this.trailForm = this.fb.group({});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClicked(row) {
    console.log(row);
  }

  loadList() {
    let table = [];
    if (localStorage.getItem('MyTable')) {
      table = JSON.parse(localStorage.getItem('MyTable'));
      table.forEach((element) => {
        this.myList.push(element);
      });
    } else {
      localStorage.setItem('MyTable', JSON.stringify(this.myList));
      localStorage.setItem('TablePos', '1');
    }
  }

  onAdd() {
    console.log(this.trailForm.value);

    this.lastPosition = this.myList.length + 1;
    this.dataSource.data = this.myList;
  }

  onDelete(row) {
    console.log('Delete', row);
    const index = this.myList.indexOf(row);
    if (index > -1) {
      this.myList.splice(index, 1);
      this.dataSource.data = this.myList;
    }
    localStorage.setItem('MyTable', JSON.stringify(this.myList));
    let tablePos = JSON.parse(localStorage.getItem('TablePos'));
    localStorage.setItem('TablePos', JSON.stringify(Number(tablePos) - 1));
  }

  searchByName() {
    console.log(this.symbolSearchValue);
    this.dataSource.data = this.myList.filter((e) =>
      e.name.toLowerCase().includes(this.symbolSearchValue.toLowerCase())
    );
  }

  clearNameSearch() {
    this.symbolSearchValue = '';
    this.dataSource = new MatTableDataSource(this.myList);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: '300px',
      // data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.myList.push(result.value);
        this.dataSource.data = this.myList;
      }
    });
  }
}
