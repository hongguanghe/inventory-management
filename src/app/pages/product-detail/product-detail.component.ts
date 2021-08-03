import { Component, Input, OnInit } from '@angular/core';
import { ProductStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productName: string = "";
  productBrand: string = "";
  productCategory: string = "";
  productPrice: number = 0;
  productLocation: string = "";
  productOnSale: string = 'Yes';
  @Input() selectedProduct: ProductStorage | any;
  @Input() allCategories: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.productName = this.selectedProduct == null ? "" : this.selectedProduct.name;
    this.productBrand = this.selectedProduct == null ? "" : this.selectedProduct.brand;
    this.productCategory = this.selectedProduct == null ? "" : this.selectedProduct.category;
    this.productPrice = this.selectedProduct == null ? "" : this.selectedProduct.price;
    this.productLocation = this.selectedProduct == null ? "" : this.selectedProduct.location;
    this.productOnSale = (this.selectedProduct == null || !this.selectedProduct.onSale) ? "No" : "Yes";
  }

}
