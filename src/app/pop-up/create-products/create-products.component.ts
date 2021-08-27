import { Component, Inject, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBatchComponent } from 'src/app/pages/edit-batch/edit-batch.component';
import { EditProductComponent } from 'src/app/pages/edit-product/edit-product.component';
import { NewProductStorage, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  newProduct: NewProductStorage
  @ViewChild(EditProductComponent) createProduct: any
  @ViewChild(EditBatchComponent) createBatches: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: string[], 
  private productService: ProductsService,
    private dialogRef: MatDialogRef<CreateProductsComponent>) {
    this.newProduct = {
      brand : "",
      name: "New Product",
      category: "",
      price: 0,
      onSale: false,
      location: "",
      batches: [
        {
          quantities: 0,
          cost: 0,
          manufacturer: "Test",
          purchasedDate: new Date(),
          expirationDate: new Date()
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  newBatch() {
    this.newProduct.batches.push(
      {
        quantities: 0,
        cost: 0,
        manufacturer: "",
        purchasedDate: undefined,
        expirationDate: undefined,
      }
    )
  }

  formValidation() {
    return !(this.createProduct.formValidationCheck() && this.createBatches.formValidationCheck());
  }

  deleteBatch(index: number) {
    this.newProduct.batches.splice(index, 1);
  }

  submitProduct() {
    for (let i = 0; i < this.newProduct.batches.length; i++) {
      this.createBatches.getSelectedBatch();
    }
    let product = this.createProduct.getSelectedProduct();
    this.productService.createProduct(product);
    this.dialogRef.close();
  }

  

}
