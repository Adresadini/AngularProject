import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { AddElementComponent } from '../modals/add-element/add-element.component';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit, AfterViewInit {

  myList = [
    {position:1, name: 'Munte', startPoint: 'lol' ,endPoint: 'lol', touristicMarking: 'lol', length: 3, levelDifference: 300,date: 'lol'},
    {position:2, name: 'Munte 2', startPoint: 'lol' ,endPoint: 'lol', touristicMarking: 'lol', length: 3, levelDifference: 600,date: 'lol'},
    {position:3, name: 'Munte 3', startPoint: 'lol' ,endPoint: 'lol', touristicMarking: 'lol', length: 3, levelDifference: 1300,date: 'lol'},
  ];

  displayedColumns: string[] = ['position', 'name','startPoint','endPoint','touristicMarking','length','levelDifference','date' ];
  dataSource;
  symbolSearchValue;
  lastPosition;

  @ViewChild(MatSort) sort: MatSort;

  trailForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.myList);

    this.trailForm = this.fb.group({
      position: [''],
      name: [''],
      weight: [''],
      symbol: ['']
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onRowClicked(row) {
    console.log(row);
  }

  onAdd() {
    console.log(this.trailForm.value);

    this.lastPosition=this.myList.length+1;
    this.myList.push(this.trailForm.value);
    this.dataSource.data = this.myList;
    // this.dataSource.sort = this.sort;
    // this.dataSource.push(this.trailForm.value);
    // this.dataSource.renderRows();
  }
  onDelete(row) {
    console.log('Delete', row);
    const index = this.myList.indexOf(row);
    if (index > -1) {
      this.myList.splice(index, 1);
      this.dataSource.data = this.myList;
    }
  }

  searchBySymbol() {
    console.log(this.symbolSearchValue);
    this.dataSource.data = this.myList.filter(e => e.name.toLowerCase() === this.symbolSearchValue.toLowerCase());
  }

  clearSymbolSearch() {
    this.symbolSearchValue = "";
    this.dataSource = new MatTableDataSource(this.myList);
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AddElementComponent, {
  //     width: '300px',
  //     // data: {name: this.name, animal: this.animal}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.myList.push(result.value);
  //       this.dataSource.data = this.myList;
  //     }
  //   });
  // }

    
  }


