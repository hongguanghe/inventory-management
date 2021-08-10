import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationDialogModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation-pop-up',
  templateUrl: './confirmation-pop-up.component.html',
  styleUrls: ['./confirmation-pop-up.component.scss']
})


export class ConfirmationPopUpComponent implements OnInit {
  title: string;
  message: string;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }


}