import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductStorage, ProductsService } from 'src/app/services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfirmationDialogModel, ConfirmationPopUpComponent } from 'src/app/pop-up/confirmation-pop-up/confirmation-pop-up.component';

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

export class SearchComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = [
    'productId', 'brand', 'category','name', 
    'price', 'quantities', 'onSale', 'location', 
    'cost', 'batches', 'edit', 'add-batch',
    'delete'];
  allProducts: any;
  allCategories: string[] = [];
  allChips: string[] = ["All"];
  expandedProduct: ProductStorage | any;
  keyword: string;
  selectedCategory: string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  constructor(private productService: ProductsService, private fb: FormBuilder, public dialog: MatDialog) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.keyword = ''
    this.selectedCategory = ''
  }
  
  ngOnInit(): void {
    this.allProducts = new MatTableDataSource();
    this.getAllProducts();
    this.getAllCategories();
  }

  // openDialog(product: ProductStorage) {
  //   this.dialog.open(DialogDataExampleDialog, {product});
  // }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.allProducts = new MatTableDataSource(products);
        this.allProducts.sort = this.sort;
        this.allProducts.paginator = this.paginator;
        if (this.allProducts.paginator) {
          this.allProducts.paginator.firstPage();
        }

      });
  }

  getAllCategories() {
    this.productService.getAllCategories()
      .subscribe(categories => {
        this.allCategories = categories;
        this.allChips = ["All"];
        this.allChips = this.allChips.concat(this.allCategories);
      });
  }


  setExpandedProduct(product: any){
    this.expandedProduct = product;
  }

  handleSearch() {
    if (this.keyword.trim().length != 0) {
      this.productService.searchProducts(this.keyword.toLocaleLowerCase(), this.selectedCategory)
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

  handleDelete(productId: number) {
    const dialogRef = this.dialog.open(ConfirmationPopUpComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure to delete this product and its associated batches?'
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.productService.deleteProduct(productId);
      }
    });
  }

  handleEdit(product: ProductStorage) {

  }

  handleAddBatch() {

  }

}



