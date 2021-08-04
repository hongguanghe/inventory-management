import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ProductStorage, ProductsService } from 'src/app/services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
}) 

export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = [
    'productId', 'brand', 'category','name', 
    'price', 'quantities', 'onSale', 
    'location', 'cost', 'batches'];
  allProducts: any;
  allCategories: string[] = [];
  sortedData: ProductStorage | any;
  allChips: string[] = ["All"];
  expandedProduct: ProductStorage | any;
  keyword: string;
  selectedCategory: string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  constructor(private productService: ProductsService, private fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.keyword = ''
    this.selectedCategory = ''
  }

  ngAfterViewInit() {
  }
  
  ngOnInit(): void {
    this.allProducts = new MatTableDataSource();
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    console.log("fetching all products");
    this.productService.getAllProducts()
      .subscribe(products => {
        this.allProducts = new MatTableDataSource(products);
        this.allProducts.sort = this.sort;
      });
    console.log("all products received");
  }


  getAllCategories() {
    console.log("fetching all categories");
    this.productService.getAllCategories()
      .subscribe(categories => {
        this.allCategories = categories;
        this.allChips = ["All"];
        this.allChips = this.allChips.concat(this.allCategories);
      });
  }

  // convertDate(date: any) {
  //   return moment(date).format('YYYY-MM-DD');
  // }

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
      this.productService.getProductsByCategory(this.selectedCategory)
      .subscribe(result => this.allProducts = new MatTableDataSource(result));
      
    }
  }

  selectChipChange($event: any, category: string) {
    if (category != null && this.selectedCategory != category) {
      if (category.toLowerCase() == "all") {
        this.selectedCategory = "";
      }
      else {
        this.selectedCategory = category;
      }
      this.handleSearch();
    }
  }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }