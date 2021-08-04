import { Component, Input, OnInit } from '@angular/core';
import { BatchStorage, ProductsService, ProductStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-associated-batches',
  templateUrl: './associated-batches.component.html',
  styleUrls: ['./associated-batches.component.scss']
})
export class AssociatedBatchesComponent implements OnInit {

  displayedColumns: string[] = [
    'batchId', 'quantities', 'expirationDate', 
    'purchasedDate', 'cost', 'manufacturer'];

  allBatches: BatchStorage[] = [];
  @Input() associatedProduct: ProductStorage | any;
  expandedBatch: BatchStorage | any;

  constructor(private productService: ProductsService) { 
    
  }

  ngOnInit(): void {
    // if (this.allBatches.length > 0) {
    //   this.associatedProduct = this.allBatches[0].product
    // }
    debugger;
    this.allBatches = this.associatedProduct.batches;
  }

  deleteBatch(batch: BatchStorage) {
    this.productService.deleteBatchById(batch.batchId);
  }

  setExpandedBatch(batch: BatchStorage) {
    this.expandedBatch = batch;
  }

}
