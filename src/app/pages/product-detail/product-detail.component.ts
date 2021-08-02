import { Component, Input, OnInit } from '@angular/core';
import { ProductStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  onSale: string = 'Yes';
  @Input() selectedProduct: ProductStorage | any;
  @Input() allCategories: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.onSale = (this.selectedProduct == null || !this.selectedProduct.onSale) ? "No" : "Yes";
  }

}
