import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BatchStorage, NewBatchStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-batch-pop-up',
  templateUrl: './edit-batch-pop-up.component.html',
  styleUrls: ['./edit-batch-pop-up.component.scss']
})
export class EditBatchPopUpComponent implements OnInit {

  selectedBatch: BatchStorage;
  title: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: BatchPopupModel) {
    this.selectedBatch = data.batch;
    this.title = data.title;
  }

  ngOnInit(): void {
  }

}

export interface BatchPopupModel {
  batch: BatchStorage;
  title: string;
}
