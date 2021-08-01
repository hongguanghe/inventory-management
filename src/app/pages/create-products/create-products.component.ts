import { Component, OnInit } from '@angular/core';
import { BatchStorage, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  allCategories: string[] = []
  productName: string = ''
  productBrand: string = ''
  productCategory: string = ''
  productPrice: number = 0.0
  productLocation: string = ''
  productOnSale: boolean = false
  productBatches: BatchStorage[] = []

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllCategories()
    .subscribe(categories => this.allCategories = categories);
    console.log(this.allCategories.length);
  }

}
