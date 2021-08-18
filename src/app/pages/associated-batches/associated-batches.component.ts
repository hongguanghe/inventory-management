import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BatchStorage, ProductsService, ProductStorage } from 'src/app/services/products.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ConfirmationPopUpComponent } from 'src/app/pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { EditBatchComponent } from '../edit-batch/edit-batch.component';
import { EditBatchPopUpComponent } from 'src/app/pop-up/edit-batch-pop-up/edit-batch-pop-up.component';


@Component({
  selector: 'app-associated-batches',
  templateUrl: './associated-batches.component.html',
  styleUrls: ['./associated-batches.component.scss']
})
export class AssociatedBatchesComponent implements OnInit {

  displayedColumns: string[] = [
    'batchId', 'quantities', 'expirationDate', 
    'purchasedDate', 'cost', 'manufacturer',
    'edit', 'delete'];

  allBatches: any;
  @Input() associatedProduct: ProductStorage | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  expandedBatch: BatchStorage | any;

  constructor(private productService: ProductsService, public confirmationDialog: MatDialog,
    public batchDialog: MatDialog) {
    this.allBatches = [];
  }

  ngAfterViewInit() {
    this.allBatches.paginator = this.paginator;
    this.allBatches.sort = this.sort;
  }

  ngOnInit(): void {
    this.allBatches = new MatTableDataSource(this.associatedProduct.batches);
    this.allBatches.sort = this.sort;
    this.allBatches.paginator = this.paginator;
  }

  setExpandedBatch(batch: BatchStorage) {
    this.expandedBatch = batch;
  }

  convertDate(date: any) {
    return moment(date).format('MM-DD-YYYY');
  }

  handleDeleteBatch(id: number) {
    const dialogRef = this.confirmationDialog.open(ConfirmationPopUpComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure to delete this batch?'
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.productService.deleteBatchById(id);
      }
    });
  }

  handleEditBatch(batch: BatchStorage) {
    const dialogRef = this.batchDialog.open(EditBatchPopUpComponent, {
      data: {
        batch: batch,
        title: 'Edit Batch'
      }
    });
  }

}
