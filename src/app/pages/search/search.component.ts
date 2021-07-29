import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ProductStorage, ProductsService } from 'src/app/services/products.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
}) 

export class SearchComponent implements OnInit{
  displayedColumns: string[] = [
    'productId', 'brand', 'category','name', 
    'price', 'quantities', 'onSale', 
    'location', 'cost', 'batches'];
  allProducts: ProductStorage[] = [];
  expandedProduct: ProductStorage | any;
  
  constructor(private prodductService: ProductsService) {
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    console.log("fetching all products");
    this.prodductService.getAllProducts()
      .subscribe(products => this.allProducts = products);
  }

  convertDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  setExpandedProduct(product: ProductStorage) {
    this.expandedProduct = product;
  }

}
