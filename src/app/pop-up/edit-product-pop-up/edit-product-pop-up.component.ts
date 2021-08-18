import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductStorage } from 'src/app/services/products.service';
import { ProductDetailModel } from '../../pages/edit-product/edit-product.component';

@Component({
  selector: 'app-edit-product-pop-up',
  templateUrl: './edit-product-pop-up.component.html',
  styleUrls: ['./edit-product-pop-up.component.scss']
})
export class EditProductPopUpComponent implements OnInit {

  selectedProduct: ProductStorage
  allCategories: string[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductDetailModel) { 
      this.selectedProduct = data.product;
      this.allCategories = data.allCategories;
  }

  ngOnInit(): void {
  }

}
