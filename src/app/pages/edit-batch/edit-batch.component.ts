import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BatchStorage, NewBatchStorage, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss']
})
export class EditBatchComponent implements OnInit {

  batchForm: FormGroup | any

  @Input() selectedBatch: BatchStorage | NewBatchStorage | any;
  @Input() editingMode: boolean = false;
  changed: boolean = true;
  emptyBatch: boolean = true

  constructor(private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.emptyBatch = !this.modeChecking();

    this.batchForm = new FormGroup({
      quantities: new FormControl(this.emptyBatch ? '' : this.selectedBatch.quantities, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      expirationDate: new FormControl(this.emptyBatch ? '' : this.selectedBatch.expirationDate, Validators.required),
      purchasedDate: new FormControl(this.emptyBatch ? '' : this.selectedBatch.purchasedDate, Validators.required),
      cost: new FormControl(this.emptyBatch ? '' : this.selectedBatch.cost, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      manufacturer: new FormControl(this.emptyBatch ? '' : this.selectedBatch.manufacturer, Validators.required),
    })
  }

  modeChecking() {
    return this.selectedBatch != null 
    && this.selectedBatch.batchId != null 
    && 'batchId' in this.selectedBatch;
  }

  formValidationCheck() {
    return this.batchForm.valid;
  }

  updateBatch() {
    this.getSelectedBatch();
    if (this.changed) {
      this.productsService.updateBatch(this.selectedBatch);
    }
  }

  getSelectedBatch() {
    if (this.selectedBatch.quantities != this.batchForm.get('quantities').value) {
      this.selectedBatch.quantities = this.batchForm.get('quantities').value;
      this.changed = true;
    }

    if (this.selectedBatch.manufacturer != this.batchForm.get('manufacturer').value) {
      this.selectedBatch.manufacturer = this.batchForm.get('manufacturer').value;
      this.changed = true;
    }

    if (this.selectedBatch.cost != this.batchForm.get('cost').value) {
      this.selectedBatch.cost = this.batchForm.get('cost').value;
      this.changed = true;
    }

    if (this.selectedBatch.expirationDate != this.batchForm.get('expirationDate').value) {
      this.selectedBatch.expirationDate = this.batchForm.get('expirationDate').value;
      this.changed = true;
    }

    if (this.selectedBatch.purchasedDate != this.batchForm.get('purchasedDate').value) {
      this.selectedBatch.purchasedDate = this.batchForm.get('purchasedDate').value;
      this.changed = true;
    }

    return this.selectedBatch;
  }

}
