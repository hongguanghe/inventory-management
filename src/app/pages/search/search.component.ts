import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ProductStorage, ProductsService } from 'src/app/services/products.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  allProducts: any;
  allCategories: string[] = [];
  expandedProduct: ProductStorage | any;
  keyword: string = ''
  selectedCategory: string | any;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  constructor(private productService: ProductsService, private fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  
  ngOnInit(): void {
    this.allProducts = new MatTableDataSource();
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    console.log("fetching all products");
    this.productService.getAllProducts()
      .subscribe(products => this.allProducts = products);
  }


  getAllCategories() {
    console.log("fetching all categories");
    this.productService.getAllCategories()
      .subscribe(categories => this.allCategories = categories);
  }

  convertDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  setExpandedProduct(product: any){
    this.expandedProduct = product;
  }

  handleSearch() {
    if (this.keyword.trim().length != 0) {
      this.productService.searchProducts(this.keyword, this.selectedCategory)
      .subscribe(result => {
        this.allProducts = new MatTableDataSource(result);
      });
    }
    else {
      this.getAllProducts();
    }
  }

}
