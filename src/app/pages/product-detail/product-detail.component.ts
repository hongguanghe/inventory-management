import { Component, Input, OnInit } from '@angular/core';
import { ProductStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  selected = 'option2';
  onSale = "Yes";
  @Input() selectedProduct: ProductStorage | any;

  constructor() { }

  ngOnInit(): void {
  }

}
