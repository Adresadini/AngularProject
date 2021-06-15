import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MountainTrail } from '../models/mountain-trail';
import { CustomValidators } from '../helpers/custom-validators';
@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css'],
})
export class AddElementComponent implements OnInit {
  trailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MountainTrail,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.trailForm = this.fb.group({
      position: [JSON.parse(localStorage.getItem('TablePos'))],
      name: ['', Validators.required],
      startPoint: ['', Validators.required],
      endPoint: ['', Validators.required],
      touristicMarking: ['', Validators.required],
      length: [
        '',
        {
          validators: Validators.compose([
            Validators.required,
            CustomValidators.numbers,
          ]),
        },
      ],
      levelDifference: [
        '',
        {
          validators: Validators.compose([
            Validators.required,
            CustomValidators.numbers,
          ]),
        },
      ],
      date: [
        '',
        {
          validators: Validators.compose([
            Validators.required,
            CustomValidators.date,
          ]),
        },
      ],
    });
  }

  onAdd() {
    let element = this.trailForm.value;
    let table = [];
    if (localStorage.getItem('MyTable')) {
      table = JSON.parse(localStorage.getItem('MyTable'));
      table = [element, ...table];
    } else {
      table = [element];
    }
    localStorage.setItem('MyTable', JSON.stringify(table));
    localStorage.setItem(
      'TablePos',
      JSON.stringify(Number(element.position) + 1)
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.trailForm.get('name');
  }

  get startPoint() {
    return this.trailForm.get('startPoint');
  }

  get endPoint() {
    return this.trailForm.get('endPoint');
  }

  get touristicMarking() {
    return this.trailForm.get('touristicMarking');
  }

  get length() {
    return this.trailForm.get('weight');
  }

  get levelDifference() {
    return this.trailForm.get('weight');
  }

  get date() {
    return this.trailForm.get('weight');
  }
}
