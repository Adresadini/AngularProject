import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MountainTrail } from "../models/mountain-trail";
import { CustomValidators } from "../helpers/custom-validators";
@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  trailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MountainTrail,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.trailForm = this.fb.group({
      position: ['', Validators.required],
      name: [''],
      startPoint: [''],
      endPoint: [''],
      touristicMarking: [''],
      length: ['',
      { validators: CustomValidators.numbers,updateOn: 'blur'}],
      levelDifference: ['',{ validators: CustomValidators.numbers,updateOn: 'blur'}],
      date: ['',{ validators: CustomValidators.date,updateOn: 'blur'}]
    })
  }


  onAdd() {

  }
  onNoClick(): void {
    this.dialogRef.close();
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
